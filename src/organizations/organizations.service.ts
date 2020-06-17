import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './models/organization.entity';
import { Repository, getManager } from 'typeorm';
import { Membership } from 'src/users/models/membership.entity';
import * as moment from 'moment';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  create(organization: Organization, user: User): Promise<Organization> {
    const entityManager = getManager();
    return entityManager.transaction(async transactionalEntityManager => {
      organization.createdBy = user.id;
      await transactionalEntityManager.save(organization);
      const membership = new Membership();
      membership.organization = organization;
      membership.user = user;
      membership.isOwner = true;
      membership.isMember = true;
      membership.memberDate = moment.utc().format();
      membership.createdBy = user.id;
      await transactionalEntityManager.save(membership);
      return organization;
    });
  }

  findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  findOne(id: string): Promise<Organization> {
    return this.organizationRepository.findOne(id);
  }

  update(organization: Organization): Promise<Organization> {
    return this.organizationRepository.save(organization);
  }
}
