import { Injectable } from '@nestjs/common';
import { Pet } from './models/pet.entity';
import { User } from 'src/users/models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
  ) {}
  create(pet: Pet, user: User): Promise<Pet> {
    pet.createdBy = user.id.toString();
    return this.petRepository.save(pet);
  }

  findAll(filters?: any): Promise<Pet[]> {
    return this.petRepository.find(filters);
  }

  findOne(id: string): Promise<Pet> {
    return this.petRepository.findOne(id);
  }

  update(pet: Pet, user: User): Promise<Pet> {
    pet.updatedBy = user.id.toString();
    return this.petRepository.save(pet);
  }
}
