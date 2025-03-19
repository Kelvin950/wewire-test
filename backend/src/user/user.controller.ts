import { Controller , Get, Injectable, UseGuards , Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { QueryParams } from './types';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('transactions')
  getUserTransactions(@Query() query: QueryParams, @GetUser() user: User) {
    return this.userService.getUserTransactions(query, user);
  }
}
