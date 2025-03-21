import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  signin(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(dto, res);
  }
}
