import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { NonceGuard } from '../nonce/nonce.guard';
import { QueryParams } from './types';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(NonceGuard)
  @UseGuards(AuthGuard)
  @Get('transactions')
  getUserTransactions(@Query() query: QueryParams, @GetUser() user: User) {
    return this.userService.getUserTransactions(query, user);
  }
}
