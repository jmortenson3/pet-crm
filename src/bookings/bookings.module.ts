import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './models/entities/booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { PubSubModule } from 'src/pubsub/pubsub.module';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { LocationsModule } from 'src/locations/locations.module';
import { BookingDetails } from './models/entities/booking-details.entity';
import { BoardingDetails } from './models/entities/boarding-details.entity';
import { GroomingDetails } from './models/entities/grooming-details.entity';
import { BookingDetailsResolver } from './book-details.resolver';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      BookingDetails,
      BoardingDetails,
      GroomingDetails,
    ]),
    PubSubModule,
    forwardRef(() => UsersModule),
    forwardRef(() => OrganizationsModule),
    forwardRef(() => LocationsModule),
    forwardRef(() => PetsModule),
  ],
  providers: [BookingsService, BookingsResolver, BookingDetailsResolver],
  exports: [BookingsService],
})
export class BookingsModule {}
