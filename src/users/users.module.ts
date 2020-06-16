import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersResolver } from './users.resolver';
import { PetsModule } from 'src/pets/pets.module';
import { PermissionsService } from './permissions.service';
import { Permission } from './models/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    forwardRef(() => AuthModule),
    forwardRef(() => PetsModule),
  ],
  providers: [UsersService, UsersResolver, PermissionsService],
  exports: [UsersService, PermissionsService],
})
export class UsersModule {}
