import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
export interface Root {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: Rates;
}
type Rates = Record<string, number>;
@Injectable()
export class ExchangeRatesService {
  constructor(
    private config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getExchangeRates() {
    try {
      const rates = await this.fetchRates();
      return { rates };
    } catch {
      // console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async fetchRates(): Promise<Rates> {
    let rates = await this.cacheManager.get<Rates>('rate');
    // console.log(rates);
    if (!rates) {
      const data = await axios.get<Root>(
        `https://openexchangerates.org/api/latest.json?app_id=${this.config.get('OPEN_EXCHANGE')}`,
      );
      rates = data.data['rates'];
      await this.cacheManager.set('rate', rates, 600);
    }

    return rates;
  }
}
