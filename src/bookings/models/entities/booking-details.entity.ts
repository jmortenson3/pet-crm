import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column,
  OneToOne,
} from 'typeorm';
import { Pet } from 'src/pets/models/pet.entity';
import { Booking } from './booking.entity';
import { BoardingDetails } from './boarding-details.entity';
import { GroomingDetails } from './grooming-details.entity';

// There should be one BookingDetails per each pet in a booking request.
@Entity()
@ObjectType()
export class BookingDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(
    type => Booking,
    booking => booking.bookingDetails,
    { onDelete: 'CASCADE' },
  )
  booking: Booking;

  @ManyToOne(type => Pet)
  pet: Pet;

  @OneToOne(
    type => BoardingDetails,
    boardingDetails => boardingDetails.bookingDetails,
    { cascade: true },
  )
  boardingDetails: BoardingDetails;

  @OneToOne(
    type => GroomingDetails,
    groomingDetails => groomingDetails.bookingDetails,
    { cascade: true },
  )
  groomingDetails: GroomingDetails;
}
