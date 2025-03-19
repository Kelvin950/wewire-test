import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { QueryParams } from './types';
import { User, Usertransaction } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserTransactions(query: QueryParams, user: User) {
    try {
      let page = 1;
      let pageSize = 10;

      if (query.page) {
        page = page;
      }

      if (query.pageSize) {
        pageSize = pageSize;
      }
      let usertransaction: Usertransaction;

      if (query.transactionId) {
        return await this.prisma.usertransaction.findMany({
          where: {
            userId: user.id,
          },
          skip: (page - 1)*pageSize ,
          take: pageSize,
        });
      }

      return await this.prisma.usertransaction.findMany({
        where: {
          userId: user.id,
          id: query.transactionId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
