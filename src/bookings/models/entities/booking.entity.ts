import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { User } from 'src/users/models/user.entity';
import { Organization } from 'src/organizations/models/organization.entity';
import { Location } from 'src/locations/models/location.entity';
import { BookingDetails } from './booking-details.entity';

export const enum BookingStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
}

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Organization)
  organization: Organization;

  @ManyToOne(type => Location)
  location: Location;

  @OneToMany(
    type => BookingDetails,
    bookingDetails => bookingDetails.booking,
    { cascade: true },
  )
  bookingDetails: BookingDetails[];

  @Column({ nullable: true })
  @Field()
  dropoffDate: string;

  @Column({ nullable: true })
  @Field()
  pickupDate: string;

  @Column()
  @Field(type => String)
  bookingStatus: BookingStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bookingDeniedNotes: string;
}
