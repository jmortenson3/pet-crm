import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Organization extends BaseEntity {
  @ObjectIdColumn()
  @Field(type => String)
  id: ObjectID;

  @Column()
  @Field()
  name: string;
}
