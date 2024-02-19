import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  private jwtService = new JwtService();
  private logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest().get('authorization')?.split(' ')[1]

    if(!req) throw new NotFoundException("No Request");

    const jwt = this.jwtService.verifyAsync(req, {
      secret: process.env.SECRET
    })

    return next.handle().pipe(map(jwt => {jwt}));
  }
}
