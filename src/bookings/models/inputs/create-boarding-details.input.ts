import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardingDetailsInput {
  @Field()
  customerNotes: string;
}
