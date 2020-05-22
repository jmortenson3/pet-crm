import { User } from './models/user.entity';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //@UseGuards(GqlAuthGuard)
  @Query(returns => User, { name: 'users' })
  async getUser(@Args('username', { type: () => String }) username: string) {
    return await this.usersService.findOne(username);
  }
}
