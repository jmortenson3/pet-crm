import { InputType, Field } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';

@InputType()
export class CreateLocationInput {
  @Field()
  name: string;

  @Field(type => String)
  organizationId: ObjectID;
}
