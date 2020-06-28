import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroomingDetailsInput {
  @Field()
  customerNotes: string;
}
