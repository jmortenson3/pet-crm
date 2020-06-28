import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Pet } from './models/pet.entity';
import { PetsService } from './pets.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreatePetInput } from './models/create-pet.input';
import { UsersService } from 'src/users/users.service';
import { Booking } from 'src/bookings/models/entities/booking.entity';
import { BookingsService } from 'src/bookings/bookings.service';

@Resolver(of => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService,
    private readonly usersService: UsersService,
    private readonly bookingsService: BookingsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Pet, { name: 'createPet' })
  async createPet(
    @Args('input') createPetData: CreatePetInput,
    @GqlUser() gqlUser: User,
  ) {
    const user = await this.usersService.findOne({ id: gqlUser.id });
    const pet = new Pet();
    pet.name = createPetData.name;
    pet.user = user;
    pet.createdBy = user.id;
    return await this.petsService.create(pet);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('bookings', returns => [Booking])
  async bookings(@Parent() pet: Pet) {
    return await this.bookingsService.findByPet(pet);
  }
}
