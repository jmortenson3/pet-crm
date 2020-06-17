import { BaseEntity } from 'src/common/base-entity.model';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/models/user.entity';

@Entity()
@ObjectType()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(type => User)
  user: User;

  @Column()
  @Field()
  name: string;
}
