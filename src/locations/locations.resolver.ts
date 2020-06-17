import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
  Subscription,
} from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Location } from './models/location.entity';
import { LocationsService } from './locations.service';
import { UseGuards, Inject } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreateLocationInput } from './models/create-location.input';
import { BookingsService } from 'src/bookings/bookings.service';
import { Booking } from 'src/bookings/models/booking.entity';
import { GetLocationByIdInput } from './models/get-location-by-id.input';
import { EVENTS } from 'src/events';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Resolver(of => Location)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly organizationsService: OrganizationsService,
    private readonly bookingsService: BookingsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Location, { name: 'createLocation' })
  async createLocation(
    @Args('input') createLocationData: CreateLocationInput,
    @GqlUser() gqlUser: User,
  ) {
    const organization = await this.organizationsService.findOne(
      createLocationData.organizationId.toString(),
    );
    const location = new Location();
    location.name = createLocationData.name;
    location.organization = organization;
    location.createdBy = gqlUser.id;
    return await this.locationsService.create(location);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Location, { name: 'location' })
  async getLocation(@Args('input') getLocationByIdData: GetLocationByIdInput) {
    return await this.locationsService.findOne(getLocationByIdData.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Location], { name: 'allLocations' })
  async getLocations() {
    return await this.locationsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('bookings', returns => [Booking])
  async bookings(@Parent() location: Location) {
    return await this.bookingsService.findByLocation(location);
  }

  @Subscription(returns => Booking, {
    name: EVENTS.BOOKING_REQUESTED,
    filter: (payload, variables) =>
      payload.bookingRequested.locationId === variables.locationId,
  })
  bookingRequested(@Args('locationId') locationId: string) {
    return this.pubSub.asyncIterator(EVENTS.BOOKING_REQUESTED);
  }

  // @Subscription(returns => Booking, {
  //   name: EVENTS.BOOKING_REQUESTED,
  // })
  // bookingRequested() {
  //   return this.pubSub.asyncIterator(EVENTS.BOOKING_REQUESTED);
  // }
}
