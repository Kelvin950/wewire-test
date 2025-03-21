import { Module } from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';

import { ExchangeRatesModule } from 'src/exchange-rates/exchange-rates.module';

@Module({
  controllers: [ConvertController],
  imports: [ExchangeRatesModule],
  providers: [ConvertService],
})
export class ConvertModule {}
