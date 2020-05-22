import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CookieExtractor {
  private readonly logger = new Logger(CookieExtractor.name);

  constructor(private configService: ConfigService) {}

  extractCookie(req: Request) {
    let token: string = null;
    if (req && req.cookies) {
      token = req.cookies[this.configService.get<string>('JWT_COOKIE_NAME')];
      this.logger.log(`Heres your token from cookies ${token}`);
    } else {
      this.logger.log('no cookie!');
    }

    this.logger.log('returning the token');

    return token;
  }
}
