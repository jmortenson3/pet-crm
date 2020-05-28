import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { ResGql } from 'src/common/decorators/res-gql.decorator';
import { Response } from 'express';
import { LoginInput } from './models/login.input';
import { SignupInput } from './models/signup.input';

@Resolver(of => User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Mutation(returns => User, { name: 'signup' })
  async signup(@Args('input') signupData: SignupInput) {
    const { username, password } = signupData;
    if (!username || !password) {
      throw new BadRequestException();
    }
    return await this.authService.signup(username, password);
  }

  @Mutation(returns => User, { name: 'login' })
  async login(@Args('input') loginData: LoginInput, @ResGql() res: Response) {
    const { username, password } = loginData;
    if (!username || !password) {
      throw new BadRequestException();
    }
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new NotFoundException();
    }

    const token = await this.authService.createTokenFromUser(user);

    res.cookie(this.configService.get<string>('JWT_COOKIE_NAME'), token, {
      //httpOnly: true,  re-enable this
    });
    return user;
  }
}
