import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { Organization } from 'src/organizations/models/organization.entity';

@Entity()
@ObjectType()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(type => Organization)
  organization: Organization;
}
