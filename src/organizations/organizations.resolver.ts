import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Organization } from './models/organization.entity';
import { OrganizationsService } from './organizations.service';
import { UseGuards, Logger } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlUser } from 'src/common/decorators/gql-user.decorator';
import { User } from 'src/users/models/user.entity';

@Resolver(of => Organization)
export class OrganizationsResolver {
  private logger = new Logger(OrganizationsResolver.name);
  constructor(private organizationsService: OrganizationsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Organization, { name: 'createOrganization' })
  async createOrganization(
    @Args('name', { type: () => String }) name: string,
    @GqlUser() user: User,
  ) {
    this.logger.log(JSON.stringify(user));
    const org = new Organization();
    org.name = name;
    return await this.organizationsService.create(org, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Organization], { name: 'organizations' })
  async getOrganizations() {
    return await this.organizationsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Organization, { name: 'organization' })
  async getOrganizationById(@Args('id', { type: () => String }) id: string) {
    return await this.organizationsService.findOne(id);
  }
}
