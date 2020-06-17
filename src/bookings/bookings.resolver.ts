import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateBookingInput } from './models/create-booking.input';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Booking } from './models/booking.entity';
import { GetBookingByIdInput } from './models/get-booking-by-id.input';
import { PubSubEngine } from 'graphql-subscriptions';
import { EVENTS } from 'src/events';
import { UsersService } from 'src/users/users.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { LocationsService } from 'src/locations/locations.service';

@Resolver()
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

    const createdBooking = await this.bookingsService.create(booking);
    this.pubSub.publish(EVENTS.BOOKING_REQUESTED, {
      [EVENTS.BOOKING_REQUESTED]: createdBooking,
    });
    return createdBooking;
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
}
