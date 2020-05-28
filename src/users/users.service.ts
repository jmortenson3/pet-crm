import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne({ email, id }: { email?: string; id?: string }): Promise<User> {
    if (!!email) {
      return this.usersRepository.findOne({ where: { email } });
    } else {
      return this.usersRepository.findOne(id);
    }
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
