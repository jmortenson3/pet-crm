import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './models/location.entity';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { PubSubModule } from 'src/pubsub/pubsub.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    forwardRef(() => OrganizationsModule),
    BookingsModule,
    PubSubModule,
  ],
  providers: [LocationsService, LocationsResolver],
  exports: [LocationsService],
})
export class LocationsModule {}
