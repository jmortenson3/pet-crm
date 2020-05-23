import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './models/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationsService, OrganizationsResolver],
})
export class OrganizationsModule {}
