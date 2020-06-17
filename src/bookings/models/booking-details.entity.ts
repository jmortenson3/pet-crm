import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Pet } from 'src/pets/models/pet.entity';
import { Booking } from './booking.entity';

@Entity()
@ObjectType()
export class BookingDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(type => Booking)
  booking: Booking;

  @ManyToOne(type => Pet)
  pet: Pet;

  @Column({ default: false })
  @Field()
  isBoarding: Boolean;

  @Column({ default: false })
  @Field()
  isGrooming: Boolean;
}
