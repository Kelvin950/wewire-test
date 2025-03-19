import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { User } from './types';

@Injectable()
export class UserService {
    constructor(
        private prisma:PrismaService
    ) {}


    async getUsers(payload:User){
      try {
           const user = await this.prisma.user.findUnique({
             where: {
               id: payload.id,
             },
             select: {
               id: true,
               email: true,
             },
           });

           if (!user) {
             throw new UnauthorizedException('Invalid credentials');
           }

           return user;
      } catch (error) {
         throw error;
      }
    }
}
