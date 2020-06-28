import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BookingDetails } from './booking-details.entity';

@Entity()
@ObjectType()
export class BoardingDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToOne(
    type => BookingDetails,
    bookingDetails => bookingDetails.boardingDetails,
  )
  @JoinColumn()
  bookingDetails: BookingDetails;

  @Column({ nullable: true })
  @Field({ nullable: true })
  customerNotes: string;
}
