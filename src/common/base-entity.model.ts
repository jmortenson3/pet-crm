import { Column, BeforeUpdate, BeforeInsert, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import * as moment from 'moment';

@ObjectType()
export abstract class BaseEntity {
  @Column()
  @Field({ nullable: true })
  public createdDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public createdBy: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public updatedDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public updatedBy: string;

  @BeforeUpdate()
  public setUpdatedDate() {
    this.updatedDate = moment.utc().format();
  }

  @BeforeInsert()
  public setCreatedDate() {
    this.createdDate = moment.utc().format();
  }
}
