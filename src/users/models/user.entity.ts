import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';
import { Pet } from 'src/pets/models/pet.entity';
import { Permission } from './permission.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => String)
  id: string;

  @Column()
  @Index({ unique: true })
  @Field({ nullable: false })
  email: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column()
  hashedPassword: string;

  @OneToMany(
    type => Pet,
    pet => pet.user,
  )
  pets: Pet[];

  @OneToMany(
    type => Permission,
    permission => permission.user,
  )
  permissions: Permission[];
}
