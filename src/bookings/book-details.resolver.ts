import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { BookingDetails } from './models/entities/booking-details.entity';
import { BookingsService } from './bookings.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { BoardingDetails } from './models/entities/boarding-details.entity';
import { GroomingDetails } from './models/entities/grooming-details.entity';

@Resolver(of => BookingDetails)
export class BookingDetailsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(GqlAuthGuard)
  @ResolveField('boardingDetails', returns => BoardingDetails)
  async getBoardingDetails(@Parent() bookingDetails: BookingDetails) {
    return await this.bookingsService.findBoardingDetails(bookingDetails);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('groomingDetails', returns => GroomingDetails)
  async getGroomingDetails(@Parent() bookingDetails: BookingDetails) {
    return await this.bookingsService.findGroomingDetails(bookingDetails);
  }
}
