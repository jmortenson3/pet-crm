import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './models/membership.entity';

@Injectable()
export class MembershipsService {
  private logger = new Logger(MembershipsService.name);
  constructor(
    @InjectRepository(Membership)
    private membershipsRepository: Repository<Membership>,
  ) {}

  findAll(filters?: any): Promise<Membership[]> {
    return this.membershipsRepository.find(filters);
  }

  findOne(id: string): Promise<Membership> {
    return this.membershipsRepository.findOne(id);
  }

  create(membership: Membership): Promise<Membership> {
    return this.membershipsRepository.save(membership);
  }

  update(membership: Membership): Promise<Membership> {
    return this.membershipsRepository.save(membership);
  }
}
