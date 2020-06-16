import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Organization } from './models/organization.entity';
import { OrganizationsService } from './organizations.service';
import {
  UseGuards,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreateOrganizationInput } from './models/create-organization.input';
import { GetOrganizationByIdInput } from './models/get-organization-by-id.input';
import { UpdateOrganizationInput } from './models/update-organization.input';
import { LocationsService } from 'src/locations/locations.service';
import { Location } from 'src/locations/models/location.entity';
import { Booking } from 'src/bookings/models/booking.entity';
import { BookingsService } from 'src/bookings/bookings.service';
import { UsersService } from 'src/users/users.service';
import { Permission } from 'src/users/models/permission.entity';
import * as moment from 'moment';
import { PermissionsService } from 'src/users/permissions.service';
import { getManager } from 'typeorm';

@Resolver(of => Organization)
export class OrganizationsResolver {
  private readonly logger = new Logger(OrganizationsResolver.name);
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly locationsService: LocationsService,
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Organization, { name: 'createOrganization' })
  async createOrganization(
    @Args('input') createOrganizationData: CreateOrganizationInput,
    @GqlUser() gqlUser: User,
  ) {
    try {
      const entityManager = getManager();
      await entityManager.transaction(async entityManager => {
        const user = await this.usersService.findOne({ id: gqlUser.id });
        const org = new Organization();
        org.name = createOrganizationData.name;
        org.createdBy = user.id;
        const createdOrganization = await this.organizationsService.create(org);

        const permission = new Permission();
        permission.user = user;
        permission.organization = org;
        permission.isOwner = true;
        permission.isMember = true;
        permission.memberDate = moment.utc().format();
        permission.createdBy = user.id;
        await this.permissionsService.create(permission);

        return createdOrganization;
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Organization, { name: 'updateOrganization' })
  async updateOrganization(
    @Args('input') updateOrganizationData: UpdateOrganizationInput,
    @GqlUser() user: User,
  ) {
    const org = await this.organizationsService.findOne(
      updateOrganizationData.id,
    );
    org.name = updateOrganizationData.name;
    org.updatedBy = user.id;
    return this.organizationsService.update(org);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Organization], { name: 'allOrganizations' })
  async getOrganizations() {
    return await this.organizationsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Organization, { name: 'organization' })
  async getOrganizationById(
    @Args('input') getOrganizationByIdData: GetOrganizationByIdInput,
  ) {
    return await this.organizationsService.findOne(getOrganizationByIdData.id);
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('locations', returns => [Location])
  async locations(@Parent() organization: Organization) {
    return await this.locationsService.findAll({
      organizationId: organization.id.toString(),
    });
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField('bookings', returns => [Booking])
  async bookings(@Parent() organization: Organization) {
    return await this.bookingsService.findAll({
      organizationId: organization.id.toString(),
    });
  }
}
