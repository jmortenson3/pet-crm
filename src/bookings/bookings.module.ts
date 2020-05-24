import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './models/booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingsService, BookingsResolver],
  exports: [BookingsService],
})
export class BookingsModule {}
