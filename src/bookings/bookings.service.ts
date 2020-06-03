import { Injectable } from '@nestjs/common';
import { Booking } from './models/booking.entity';
import { User } from 'src/users/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}
  create(booking: Booking): Promise<Booking> {
    return this.bookingRepository.save(booking);
  }

  findAll(filters?: any): Promise<Booking[]> {
    return this.bookingRepository.find(filters);
  }

  findOne(id: string): Promise<Booking> {
    return this.bookingRepository.findOne(id);
  }

  update(booking: Booking): Promise<Booking> {
    return this.bookingRepository.save(booking);
  }
}
