import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConvertDto } from './dto';
import axios from 'axios';

@Injectable()
export class ConvertService {
  constructor(
    private primsaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async Postconvert(dto: ConvertDto) {
    try {
      const res = await axios.get(
        `https://openexchangerates.org/api/latest.json?app_id=${this.configService.get('OPEN_EXCHANGE')}`,
      );

      const to = res.data["rates"][dto.to]
      const from=  res.data["rates"][dto.from] 

      if(!to){
        throw new NotFoundException(`${to} currency not found `)
      }

      if(!from){
       throw new NotFoundException(`${from} currency not found `);
      }

      const convertedAmt = (dto.amount / from) * to;
      const rate = to / from;
https://openexchangerates.org/api/convert/19999.95/GBP/EUR?app_id=YOUR_APP_ID
      //  const newTransaction = await this.primsaService.usertransaction.create(
      //    {
      //      data: {
      //        toCurrency: '',
      //        fromCurrency: '',
      //        result: 1,
      //        rate:2,
      //        amount: 2,
      //        userId:1
      //      },
      //    },
      //  );
      
    

      return {convertedAmt ,rate , rates:res.data};
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
