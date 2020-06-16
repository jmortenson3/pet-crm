import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { User } from './user.entity';
import { Organization } from 'src/organizations/models/organization.entity';
import { Location } from 'src/locations/models/location.entity';

@Entity()
@ObjectType()
export class Permission extends BaseEntity {
  @ManyToOne(type => Organization, {
    primary: true,
  })
  organization: Organization;

  @ManyToOne(type => Location, { primary: true, nullable: true })
  location: Location;

  @ManyToOne(type => User, { primary: true })
  user: User;

  @Column({ default: false })
  @Field({
    description:
      'Owners can read and write every resource and can delete locations/organizations.',
  })
  isOwner: boolean;

  @Column({ default: false })
  @Field({ description: 'Admins can read and write every resource.' })
  isAdmin: boolean;

  @Column({ default: false })
  @Field()
  isInvited: boolean;

  @Column({ nullable: true })
  @Field()
  invitedDate: string;

  @Column({ default: false })
  @Field()
  isInviteAccepted: boolean;

  @Column({ default: false })
  @Field()
  isMember: boolean;

  @Column({ nullable: true })
  @Field({ description: "Anniversary date of this user's membership." })
  memberDate: string;
}
