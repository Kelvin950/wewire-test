import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class NonceService {
  constructor(
    private configService: ConfigService,
    private jwt: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  generateNonce(): string {
    return crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
  }

  async verifyNonce(nonce: string) {
    const value = await this.cacheManager.get<number>(nonce);
    console.log(value, 212);
    if (value) {
      console.log('sd');
      return true; //nonce has already been used
    }

    console.log('wew32');
    await this.cacheManager.set(nonce, Date.now());
    return false;
  }

  async signNonce() {
    const nonce = this.generateNonce();

    const signednonce = await this.jwt.signAsync(
      { nonce: nonce, timestamp: Date.now() },
      { secret: this.configService.get('JWT_SECRET_NONCE'), expiresIn: '5m' },
    );
    return signednonce;
  }

  async setToCookie(res: Response) {
    try {
      const signednonce = await this.signNonce();
      res.cookie('validCred', signednonce, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 5 * 60 * 1000,
      });
      return { message: 'success' };
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
