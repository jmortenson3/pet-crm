import { InputType, Field } from '@nestjs/graphql';
import { ObjectID } from 'typeorm';
import { CreateBoardingDetailsInput } from './create-boarding-details.input';
import { CreateGroomingDetailsInput } from './create-grooming-details.input';

@InputType()
export class CreateBookingDetailsInput {
  @Field(type => String)
  petId: ObjectID;

  @Field({ nullable: true })
  boardingDetails: CreateBoardingDetailsInput;

  @Field({ nullable: true })
  groomingDetails: CreateGroomingDetailsInput;
}
