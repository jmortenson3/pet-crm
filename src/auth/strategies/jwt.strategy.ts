import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { CookieExtractor } from './cookie-extractor.helper';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly cookieExtractor: CookieExtractor,
  ) {
    super({
      jwtFromRequest: cookieExtractor.extractCookie,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    this.logger.log('JWT strat is being called, here is the payload:');
    this.logger.log(JSON.stringify(payload));
    return payload;
    //return this.authService.validateUser(payload);
  }
}
