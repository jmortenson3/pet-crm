import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.model';

@ObjectType()
export class Organization extends BaseEntity {
  @Field()
  id: number;

  @Field()
  name: string;
}
