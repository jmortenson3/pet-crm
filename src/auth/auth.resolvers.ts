import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { ResGql } from 'src/common/decorators/res-gql.decorator';
import { Response } from 'express';

@Resolver(of => User)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Mutation(returns => User, { name: 'signup' })
  async signup(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ) {
    if (!username || !password) {
      throw new BadRequestException();
    }
    return await this.authService.signup(username, password);
  }

  @Mutation(returns => User, { name: 'login' })
  async login(
    @Args({ name: 'username', type: () => String }) username: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @ResGql() res: Response,
  ) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new NotFoundException();
    }

    const token = await this.authService.createTokenFromUser(user);
    this.logger.log('token: ' + token);

    res.cookie(this.configService.get<string>('JWT_COOKIE_NAME'), token, {
      httpOnly: true,
    });

    return user;
  }
}
