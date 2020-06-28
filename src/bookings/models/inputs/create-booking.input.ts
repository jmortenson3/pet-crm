import { InputType, Field } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';
import { CreateBookingDetailsInput } from './create-booking-details.input';

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

  @Field(type => [CreateBookingDetailsInput])
  bookingDetails: CreateBookingDetailsInput[];
}
