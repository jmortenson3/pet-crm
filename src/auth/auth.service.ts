import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, password: string): Promise<User> {
    // do nothing yet
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = username;
    user.hashedPassword = hashedPassword;
    return this.usersService.create(user);
  }

  async createTokenFromUser(user: User): Promise<string> {
    return this.jwtService.sign({ id: user.id });
  }

  async validateUser(username: string, password: string): Promise<User | any> {
    const user = await this.usersService.findOne({ email: username });
    if (!user) {
      return null;
    }
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
