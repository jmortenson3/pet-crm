import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetLocationByIdInput {
  @Field()
  id: string;
}
