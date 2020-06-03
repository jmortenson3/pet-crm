import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './models/location.entity';
import { User } from 'src/users/models/user.entity';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly organizationService: OrganizationsService,
  ) {}

  create(location: Location): Promise<Location> {
    const organization = this.organizationService.findOne(
      location.organization.id,
    );
    if (!organization) {
      throw new NotFoundException();
    }
    return this.locationRepository.save(location);
  }

  findAll(filters?: any): Promise<Location[]> {
    return this.locationRepository.find(filters);
  }

  findOne(id: string): Promise<Location> {
    return this.locationRepository.findOne(id);
  }

  update(location: Location, user: User): Promise<Location> {
    location.updatedBy = user.id.toString();
    return this.locationRepository.save(location);
  }
}
