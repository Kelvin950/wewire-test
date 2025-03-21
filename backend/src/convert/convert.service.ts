import {
  HttpException,
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { ConvertDto } from './dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { User } from '@prisma/client';
import { ExchangeRatesService } from '../exchange-rates/exchange-rates.service';
export interface Root {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Rates;
}
type Rates = Record<string, number>;

@Injectable()
export class ConvertService {
  constructor(
    private primsaService: PrismaService,
    private configService: ConfigService,
    private exchangeRatesService: ExchangeRatesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async Postconvert(dto: ConvertDto, user: User) {
    try {
      // let rates = await this.cacheManager.get<Rates>('rate');

      // if (!rates) {
      //   const data = await axios.get<Root>(
      //     `https://openexchangerates.org/api/latest.json?app_id=${this.configService.get('OPEN_EXCHANGE')}`,
      //   );
      //   rates = data.data['rates'];
      //   await this.cacheManager.set('rate', rates);
      // }
      const rates = await this.exchangeRatesService.fetchRates();
      // console.log(rates);
      // console.log(dto);
      const to = rates[dto.to];
      const from = rates[dto.from];
      // console.log(to, from);
      if (!to) {
        throw new NotFoundException(`${to} currency not found `);
      }

      if (!from) {
        throw new NotFoundException(`${from} currency not found `);
      }

      const convertedAmt = (dto.amount / from) * to;
      const rate = to / from;

      const newTransaction = await this.primsaService.usertransaction.create({
        data: {
          toCurrency: dto.to,
          fromCurrency: dto.from,
          result: convertedAmt,
          rate,
          amount: dto.amount,
          userId: user.id,
        },
      });

      return newTransaction;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
