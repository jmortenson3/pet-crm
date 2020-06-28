import { Injectable } from '@nestjs/common';
import { Booking, BookingStatus } from './models/entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/organizations/models/organization.entity';
import { Location } from 'src/locations/models/location.entity';
import { BookingDetails } from './models/entities/booking-details.entity';
import { BoardingDetails } from './models/entities/boarding-details.entity';
import { GroomingDetails } from './models/entities/grooming-details.entity';
import { User } from 'src/users/models/user.entity';
import { Pet } from 'src/pets/models/pet.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(BookingDetails)
    private readonly bookingDetailsRepository: Repository<BookingDetails>,
    @InjectRepository(BoardingDetails)
    private readonly boardingDetailsRepository: Repository<BoardingDetails>,
    @InjectRepository(GroomingDetails)
    private readonly groomingDetailsRepository: Repository<GroomingDetails>,
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

  findBookingDetails(booking: Booking): Promise<BookingDetails[]> {
    return this.bookingDetailsRepository
      .createQueryBuilder('bookingDetails')
      .innerJoin('bookingDetails.booking', 'booking')
      .where('bookingDetails.booking = :booking', {
        booking: booking.id,
      })
      .getMany();
  }

  findBoardingDetails(
    bookingDetails: BookingDetails,
  ): Promise<BoardingDetails> {
    return this.boardingDetailsRepository
      .createQueryBuilder('boardingDetails')
      .innerJoin('boardingDetails.bookingDetails', 'bookingDetails')
      .where('boardingDetails.bookingDetails = :bookingDetails', {
        bookingDetails: bookingDetails.id,
      })
      .getOne();
  }

  findGroomingDetails(
    bookingDetails: BookingDetails,
  ): Promise<GroomingDetails> {
    return this.groomingDetailsRepository
      .createQueryBuilder('groomingDetails')
      .innerJoin('groomingDetails.bookingDetails', 'bookingDetails')
      .where('groomingDetails.bookingDetails = :bookingDetails', {
        bookingDetails: bookingDetails.id,
      })
      .getOne();
  }

  findByUser(user: User): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.user', 'user')
      .where('booking.user = :user', {
        user: user.id,
      })
      .getMany();
  }

  findByPet(pet: Pet): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.bookingDetails', 'bookingDetails')
      .innerJoin('bookingDetails.pet', 'pet')
      .where('bookingDetails.pet = :pet', {
        pet: pet.id,
      })
      .getMany();
  }
}
