import { Entity, Column, ObjectIdColumn, ObjectID, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @ObjectIdColumn()
  @Field(type => String)
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  @Field({ nullable: false })
  email: string;

  @Column()
  @Field({ nullable: true })
  firstName: string;

  @Column()
  @Field({ nullable: true })
  lastName: string;

  @Column()
  hashedPassword: string;
}
