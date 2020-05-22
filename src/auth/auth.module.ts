import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LoggerModule } from 'src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CookieExtractor } from './strategies/cookie-extractor.helper';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolvers';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    LoggerModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    CookieExtractor,
    JwtStrategy,
    AuthResolver,
  ],
  exports: [CookieExtractor, AuthService],
})
export class AuthModule {}
