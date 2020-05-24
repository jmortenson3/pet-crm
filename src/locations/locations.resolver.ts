import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { Location } from './models/location.entity';
import { LocationsService } from './locations.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreateLocationInput } from './models/create-location.input';
import { BookingsService } from 'src/bookings/bookings.service';
import { Booking } from 'src/bookings/models/booking.entity';
import { GetLocationByIdInput } from './models/get-location-by-id.input';

@Resolver(of => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly bookingsService: BookingsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Location, { name: 'createLocation' })
  async createLocation(
    @Args('input') createLocationData: CreateLocationInput,
    @GqlUser() user: User,
  ) {
    const location = new Location();
    location.name = createLocationData.name;
    location.organizationId = createLocationData.organizationId.toString();
    return await this.locationsService.create(location, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Location, { name: 'location' })
  async getLocation(@Args('input') getLocationByIdData: GetLocationByIdInput) {
    return await this.locationsService.findOne(getLocationByIdData.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Location, { name: 'allLocation' })
  async getLocations() {
    return await this.locationsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('bookings', returns => [Booking])
  async bookings(@Parent() location: Location) {
    return await this.bookingsService.findAll({
      locationId: location.id.toString(),
    });
  }
}
