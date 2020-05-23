import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';

@Entity()
@ObjectType()
export class Location extends BaseEntity {
  @ObjectIdColumn()
  @Field(type => String)
  id: ObjectID;

  @Column()
  @Field()
  organizationId: string;

  @Column()
  @Field()
  name: string;
}
