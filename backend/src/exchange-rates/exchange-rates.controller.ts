import { Controller, UseGuards , Get } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('exchange-rates')
export class ExchangeRatesController {

    constructor(private echangeRateService: ExchangeRatesService){

    }

    @UseGuards(AuthGuard)
    @Get()
    getExchangeRates(){

       return  this.echangeRateService.getExchangeRates() 

    }
}
