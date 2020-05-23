import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Organization } from './models/organization.entity';
import { OrganizationsService } from './organizations.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';
import { CreateOrganizationInput } from './models/create-organization.input';
import { GetOrganizationByIdInput } from './models/get-organization-by-id.input';

@Resolver(of => Organization)
export class OrganizationsResolver {
  constructor(private organizationsService: OrganizationsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Organization, { name: 'createOrganization' })
  async createOrganization(
    @Args('input') createOrganizationData: CreateOrganizationInput,
    @GqlUser() user: User,
  ) {
    const org = new Organization();
    org.name = createOrganizationData.name;
    return await this.organizationsService.create(org, user);
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
}
