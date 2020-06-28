import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './models/pet.entity';
import { UsersModule } from 'src/users/users.module';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    forwardRef(() => UsersModule),
    forwardRef(() => BookingsModule),
  ],
  providers: [PetsService, PetsResolver],
  exports: [PetsService],
})
export class PetsModule {}
