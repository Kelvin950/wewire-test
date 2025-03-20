import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';


@Injectable()
export class ExchangeRatesService {
  constructor(private config:ConfigService) {}

  async getExchangeRates() {
    try {
    
      const res = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=${this.config.get('OPEN_EXCHANGE')}`,
      );

      
      return res.data;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
  }
}
