import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Location } from './models/location.entity';
import { LocationsService } from './locations.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreateLocationInput } from './models/create-location.input';

@Resolver(of => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

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
}
