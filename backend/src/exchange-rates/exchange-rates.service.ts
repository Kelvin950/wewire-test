import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class ExchangeRatesService {
  constructor() {}

  async getExchangeRates() {
    try {
      const res = await axios.get('');

      console.log(res);
      return res;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
