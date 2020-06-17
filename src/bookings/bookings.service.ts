import { Injectable } from '@nestjs/common';
import { Booking, BookingStatus } from './models/booking.entity';
import { User } from 'src/users/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/organizations/models/organization.entity';
import { Location } from 'src/locations/models/location.entity';

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

  findByLocation(location: Location): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.location', 'location')
      .where('booking.location = :location', {
        location: location.id,
      })
      .getMany();
  }

  findByOrganization(organization: Organization): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.organization', 'organization')
      .where('booking.organization = :organization', {
        organization: organization.id,
      })
      .getMany();
  }

  update(booking: Booking): Promise<Booking> {
    return this.bookingRepository.save(booking);
  }

  acceptBooking(booking: Booking): Promise<Booking> {
    booking.bookingStatus = BookingStatus.ACCEPTED;
    return this.bookingRepository.save(booking);
  }

  denyBooking(booking: Booking, deniedNotes: string): Promise<Booking> {
    booking.bookingStatus = BookingStatus.DENIED;
    booking.bookingDeniedNotes = deniedNotes;
    return this.bookingRepository.save(booking);
  }
}
