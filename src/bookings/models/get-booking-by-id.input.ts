import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetBookingByIdInput {
  @Field()
  id: string;
}
