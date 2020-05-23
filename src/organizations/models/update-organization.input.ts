import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizationInput {
  @Field()
  id: string;

  @Field()
  name: string;
}
