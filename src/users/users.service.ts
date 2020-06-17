import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Membership } from './models/membership.entity';
import { Repository, QueryBuilder } from 'typeorm';
import { Organization } from 'src/organizations/models/organization.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Membership)
    private membershipsRepository: Repository<Membership>,
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

  findUsersByOrganization(organization: Organization): Promise<User[]> {
    return this.usersRepository.find({
      join: { alias: 'users', innerJoin: { memberships: 'users.memberships' } },
      where: qb => {
        qb.where({}).andWhere('memberships.organizationId = :organizationId', {
          organizationId: organization.id,
        });
      },
    });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
