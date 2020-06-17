import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AcceptBookingInput {
  @Field()
  id: string;
}
