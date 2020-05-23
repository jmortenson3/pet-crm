import { User } from './models/user.entity';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Pet } from 'src/pets/models/pet.entity';
import { PetsService } from 'src/pets/pets.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly petsService: PetsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => [User], { name: 'allUsers' })
  async getUsers() {
    return await this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => User, { name: 'user' })
  async getUser(@Args('username', { type: () => String }) username: string) {
    return await this.usersService.findOne(username);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('pets', returns => [Pet])
  async pets(@Parent() user: User) {
    return await this.petsService.findAll({ userId: user.id.toString() });
  }
}
