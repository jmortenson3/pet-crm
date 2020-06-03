import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './models/booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { PubSubModule } from 'src/pubsub/pubsub.module';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    PubSubModule,
    UsersModule,
    forwardRef(() => OrganizationsModule),
    forwardRef(() => LocationsModule),
  ],
  providers: [BookingsService, BookingsResolver],
  exports: [BookingsService],
})
export class BookingsModule {}
