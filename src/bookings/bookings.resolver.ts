import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateBookingInput } from './models/create-booking.input';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Booking } from './models/booking.entity';
import { GetBookingByIdInput } from './models/get-booking-by-id.input';

@Resolver()
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Booking, { name: 'createBooking' })
  async createBooking(
    @Args('input') createBookingData: CreateBookingInput,
    @GqlUser() user: User,
  ) {
    const booking = new Booking();
    booking.userId = user.id.toString();
    booking.organizationId = createBookingData.organizationId.toString();
    booking.locationId = createBookingData.locationId.toString();
    booking.pickupDate = createBookingData.pickupDate;
    booking.dropoffDate = createBookingData.dropoffDate;
    return await this.bookingsService.create(booking, user);
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