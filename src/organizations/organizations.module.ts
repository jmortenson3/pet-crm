import { Module, forwardRef } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './models/organization.entity';
import { LocationsModule } from 'src/locations/locations.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    forwardRef(() => LocationsModule),
    forwardRef(() => BookingsModule),
    forwardRef(() => UsersModule),
  ],
  providers: [OrganizationsService, OrganizationsResolver],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
