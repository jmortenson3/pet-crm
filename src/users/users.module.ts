import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersResolver } from './users.resolver';
import { PetsModule } from 'src/pets/pets.module';
import { MembershipsService } from './memberships.service';
import { Membership } from './models/membership.entity';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Membership]),
    forwardRef(() => AuthModule),
    forwardRef(() => PetsModule),
    forwardRef(() => BookingsModule),
  ],
  providers: [UsersService, UsersResolver, MembershipsService],
  exports: [UsersService, MembershipsService],
})
export class UsersModule {}
