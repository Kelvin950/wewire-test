import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { ConvertModule } from './convert/convert.module';



@Module({
  imports: [AuthModule, UserModule,  PrismaModule ,ConfigModule.forRoot({isGlobal:true}) , JwtModule.register({global:true}), ConvertModule, ExchangeRatesModule],
 
})
export class AppModule {}
