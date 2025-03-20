import { Controller, UseGuards , Get } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { AuthGuard } from '../auth/auth.guard';
import { NonceGuard } from '../nonce/nonce.guard';

@Controller('exchange-rates')
export class ExchangeRatesController {

    constructor(private echangeRateService: ExchangeRatesService){

    }
    @UseGuards(NonceGuard)
    @UseGuards(AuthGuard)
    @Get()
    getExchangeRates(){

       return  this.echangeRateService.getExchangeRates() 

    }
}
