import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './models/permission.entity';

@Injectable()
export class PermissionsService {
  private logger = new Logger(PermissionsService.name);
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  findAll(filters?: any): Promise<Permission[]> {
    return this.permissionsRepository.find(filters);
  }

  findOne(id: string): Promise<Permission> {
    return this.permissionsRepository.findOne(id);
  }

  create(permission: Permission): Promise<Permission> {
    return this.permissionsRepository.save(permission);
  }

  update(permission: Permission): Promise<Permission> {
    return this.permissionsRepository.save(permission);
  }
}
