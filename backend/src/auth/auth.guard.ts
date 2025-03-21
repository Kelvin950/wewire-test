import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string }; user?: any }>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('User not logged In');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    try {
      const user = await this.jwt.verifyAsync<{ id: string; email: string }>(
        token,
        {
          secret: this.config.get<string>('JWT_SECRET'),
        },
      );
      request.user = user;
    } catch {
      throw new UnauthorizedException('User not logged In');
    }

    return true;
  }
}
