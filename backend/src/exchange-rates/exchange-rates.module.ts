import { Module } from '@nestjs/common';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates.service';
import { NonceModule } from 'src/nonce/nonce.module';

@Module({
  imports:[NonceModule],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService]
})
export class ExchangeRatesModule {}
