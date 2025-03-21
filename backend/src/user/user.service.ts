import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { QueryParams } from './types';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserTransactions(query: QueryParams, user: User) {
    try {
      let page = 1;
      let pageSize = 10;

      if (query.page) {
        page = query.page;
      }

      if (query.pageSize) {
        pageSize = query.pageSize;
      }

      if (query.transactionId) {
        return await this.prisma.usertransaction.findMany({
          where: {
            userId: user.id,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
      }

      return await this.prisma.usertransaction.findMany({
        where: {
          userId: user.id,
          id: query.transactionId,
        },
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
