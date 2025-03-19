import { Controller , Get, Injectable, UseGuards , Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
@Controller('user')

export class UserController {
  constructor(private userService: UserService) {}

@UseGuards(AuthGuard)
  @Get() 
  getUser(@Req() req){
 
    return this.userService.getUsers(req.user)
  }
}
