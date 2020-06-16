import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { join, resolve } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersResolver } from './users/users.resolver';
import { AuthResolver } from './auth/auth.resolvers';
import { OrganizationsModule } from './organizations/organizations.module';
import { LocationsModule } from './locations/locations.module';
import { PetsModule } from './pets/pets.module';
import { BookingsModule } from './bookings/bookings.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { ResponseHeadersMiddleware } from './common/middleware/response-headers.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
      include: [
        UsersModule,
        AuthModule,
        OrganizationsModule,
        LocationsModule,
        PetsModule,
        BookingsModule,
      ],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      playground: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWD,
      database: process.env.DB_DATABASE_NAME,
      synchronize: true,
      entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
      logging: 'all',
    }),
    UsersModule,
    AuthModule,
    OrganizationsModule,
    LocationsModule,
    PetsModule,
    BookingsModule,
    PubSubModule,
  ],
  providers: [UsersResolver, AuthResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieParser(),
        LoggerMiddleware,
        //ResponseHeadersMiddleware,
      )
      .forRoutes('*');
  }
}
