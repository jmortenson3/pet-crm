import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './models/organization.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  create(organization: Organization): Promise<Organization> {
    return this.organizationRepository.save(organization);
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
