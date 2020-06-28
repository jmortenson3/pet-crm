import { BaseEntity } from 'src/common/base-entity.model';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.entity';
import { Booking } from 'src/bookings/models/entities/booking.entity';
import { BookingDetails } from 'src/bookings/models/entities/booking-details.entity';

@Entity()
@ObjectType()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(type => User)
  user: User;

  @OneToMany(
    type => BookingDetails,
    bookingDetails => bookingDetails.pet,
  )
  bookings: Booking[];

  @Column()
  @Field()
  name: string;
}
