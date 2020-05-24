import { InputType, Field } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';

@InputType()
export class CreateBookingInput {
  @Field(type => String)
  organizationId: ObjectID;

  @Field(type => String)
  locationId: ObjectID;

  @Field()
  dropoffDate: string;

  @Field()
  pickupDate: string;
}
