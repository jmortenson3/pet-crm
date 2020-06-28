import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateBookingInput } from './models/inputs/create-booking.input';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Booking, BookingStatus } from './models/entities/booking.entity';
import { GetBookingByIdInput } from './models/inputs/get-booking-by-id.input';
import { AcceptBookingInput } from './models/inputs/accept-booking.input';
import { DenyBookingInput } from './models/inputs/deny-booking.input';
import { PubSubEngine } from 'graphql-subscriptions';
import { EVENTS } from 'src/events';
import { UsersService } from 'src/users/users.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { LocationsService } from 'src/locations/locations.service';
import { BookingDetails } from './models/entities/booking-details.entity';
import { BoardingDetails } from './models/entities/boarding-details.entity';
import { GroomingDetails } from './models/entities/grooming-details.entity';

@Resolver(of => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
    private readonly locationsService: LocationsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Booking, { name: 'createBooking' })
  async createBooking(
    @Args('input') createBookingData: CreateBookingInput,
    @GqlUser() gqlUser: User,
  ) {
    const user = await this.usersService.findOne({ id: gqlUser.id });
    const organization = await this.organizationsService.findOne(
      createBookingData.organizationId.toString(),
    );
    const location = await this.locationsService.findOne(
      createBookingData.locationId.toString(),
    );
    const booking = new Booking();
    booking.user = user;
    booking.organization = organization;
    booking.location = location;
    booking.pickupDate = createBookingData.pickupDate;
    booking.dropoffDate = createBookingData.dropoffDate;
    booking.createdBy = user.id.toString();
    booking.bookingStatus = BookingStatus.REQUESTED;

    booking.bookingDetails = [];

    createBookingData.bookingDetails.forEach(details => {
      const bookingDetails = new BookingDetails();

      if (details.boardingDetails) {
        const boardingDetails = new BoardingDetails();
        boardingDetails.customerNotes = details.boardingDetails.customerNotes;
        bookingDetails.boardingDetails = boardingDetails;
      }

      if (details.groomingDetails) {
        const groomingDetails = new GroomingDetails();
        groomingDetails.customerNotes = details.groomingDetails.customerNotes;
        bookingDetails.groomingDetails = groomingDetails;
      }

      booking.bookingDetails.push(bookingDetails);
    });

    const createdBooking = await this.bookingsService.create(booking);
    this.pubSub.publish(EVENTS.BOOKING_REQUESTED, {
      [EVENTS.BOOKING_REQUESTED]: createdBooking,
    });
    return createdBooking;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Booking, { name: 'acceptBooking' })
  async acceptBooking(
    @Args('input') acceptBookingData: AcceptBookingInput,
    @GqlUser() gqlUser: User,
  ) {
    const user = await this.usersService.findOne({ id: gqlUser.id });
    const booking = await this.bookingsService.findOne(acceptBookingData.id);
    booking.updatedBy = user.id;
    const acceptedBooking = await this.bookingsService.acceptBooking(booking);
    return acceptedBooking;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Booking, { name: 'denyBooking' })
  async denyBooking(
    @Args('input') denyBookingData: DenyBookingInput,
    @GqlUser() gqlUser: User,
  ) {
    const user = await this.usersService.findOne({ id: gqlUser.id });
    const booking = await this.bookingsService.findOne(denyBookingData.id);
    booking.updatedBy = user.id;
    const deniedBooking = await this.bookingsService.denyBooking(
      booking,
      denyBookingData.deniedNotes,
    );
    return deniedBooking;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Booking, { name: 'booking' })
  async getBooking(@Args('input') getBookingByIdData: GetBookingByIdInput) {
    return await this.bookingsService.findOne(getBookingByIdData.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Booking], { name: 'allBookings' })
  async getBookings() {
    return await this.bookingsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('bookingDetails', returns => [BookingDetails])
  async getBookingDetails(@Parent() booking: Booking) {
    return await this.bookingsService.findBookingDetails(booking);
  }
}
