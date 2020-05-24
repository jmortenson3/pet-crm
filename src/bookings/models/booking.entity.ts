import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';

@Entity()
@ObjectType()
export class Booking extends BaseEntity {
  @ObjectIdColumn()
  @Field(type => String)
  id: ObjectID;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  organizationId: string;

  @Column()
  @Field()
  locationId: string;

  @Column()
  @Field()
  dropoffDate: string;

  @Column()
  @Field()
  pickupDate: string;
}
