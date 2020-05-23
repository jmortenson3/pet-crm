import { BaseEntity } from 'src/common/base-entity.model';
import { ObjectIdColumn, Entity, ObjectID, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Pet extends BaseEntity {
  @ObjectIdColumn()
  @Field(type => String)
  id: ObjectID;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  name: string;
}
