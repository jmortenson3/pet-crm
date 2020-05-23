import { InputType, Field } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';

@InputType()
export class CreatePetInput {
  @Field()
  name: string;

  @Field(type => String)
  userId: ObjectID;
}
