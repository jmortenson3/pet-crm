import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToOne } from 'typeorm';
import { GroomingDetails } from './grooming-details.entity';

@ObjectType()
@Entity()
export class GroomingOptions {
  @OneToOne(type => GroomingDetails)
  groomingDetails: GroomingDetails;

  @Column({ nullable: true })
  @Field()
  options: string;

  @Column({ nullable: true })
  @Field()
  value: string;
}
