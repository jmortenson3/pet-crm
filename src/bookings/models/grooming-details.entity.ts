import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BookingDetails } from './booking-details.entity';

@Entity()
@ObjectType()
export class GroomingDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(type => BookingDetails)
  bookingDetails: BookingDetails;

  @Column({ nullable: true })
  @Field()
  customerNotes: string;
}
