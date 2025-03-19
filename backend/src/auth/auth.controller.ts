import {Body, Controller, ExecutionContext, HttpCode, Post} from "@nestjs/common"
import { AuthService } from "./auth.service";

import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}  