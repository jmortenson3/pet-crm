import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DenyBookingInput {
  @Field()
  id: string;

  @Field()
  deniedNotes: string;
}
