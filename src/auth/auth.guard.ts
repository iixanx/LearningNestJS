import { CanActivate, ExecutionContext, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtService: JwtService = new JwtService()
  private logger: Logger = new Logger()

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const header = req.get('authorization')?.split(' ')[1];
    if(!header) throw new NotFoundException()
    const userId = this.jwtService.verifyAsync(header, {
      secret: process.env.SECRET,
    });
    return userId ? true : false;
  }
}
