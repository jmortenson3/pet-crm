import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { User } from 'src/users/models/user.entity';
import { Organization } from 'src/organizations/models/organization.entity';
import { Location } from 'src/locations/models/location.entity';

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

  @Column({ nullable: true })
  @Field()
  dropoffDate: string;

  @Column({ nullable: true })
  @Field()
  pickupDate: string;
}
