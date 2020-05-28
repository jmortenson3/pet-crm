import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ResponseHeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.set('Access-Control-Allow-Credentials', 'true');
    //res.removeHeader('X-Powered-By');
    next();
  }
}
