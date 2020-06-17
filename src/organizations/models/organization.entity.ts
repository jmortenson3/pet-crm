import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Location } from 'src/locations/models/location.entity';
import { Membership } from 'src/users/models/membership.entity';

@Entity()
@ObjectType()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(
    () => Location,
    location => location.organization,
  )
  locations: Location[];

  @OneToMany(
    () => Membership,
    membership => membership.organization,
  )
  memberships: Membership[];
}
