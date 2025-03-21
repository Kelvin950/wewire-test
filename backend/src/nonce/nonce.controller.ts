import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { NonceService } from './nonce.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';

@Controller('nonce')
export class NonceController {
  constructor(private nonceService: NonceService) {}
  @UseGuards(AuthGuard)
  @Get()
  getNonce(@Res({ passthrough: true }) res: Response) {
    return this.nonceService.setToCookie(res);
  }
}
