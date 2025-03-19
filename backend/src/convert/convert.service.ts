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

       const newTransaction = await this.primsaService.usertransaction.create(
         {
           data: {
             toCurrency: dto.to,
             fromCurrency: dto.from,
             result: convertedAmt,
             rate,
             amount: dto.amount,
             userId:1
           },
         },
       );
      
    

      return newTransaction;
    } catch (error) {
      
      throw new InternalServerErrorException();
    }
  }
}
