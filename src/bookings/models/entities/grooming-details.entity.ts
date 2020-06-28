import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BookingDetails } from './booking-details.entity';

@Entity()
@ObjectType()
export class GroomingDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToOne(
    type => BookingDetails,
    bookingDetails => bookingDetails.groomingDetails,
  )
  @JoinColumn()
  bookingDetails: BookingDetails;

  @Column({ nullable: true })
  @Field()
  customerNotes: string;
}
