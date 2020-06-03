import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Pet } from './models/pet.entity';
import { PetsService } from './pets.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreatePetInput } from './models/create-pet.input';
import { UsersService } from 'src/users/users.service';

@Resolver(of => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService,
    private readonly usersService: UsersService,
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
}
