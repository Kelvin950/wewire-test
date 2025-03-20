import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { ConvertModule } from './convert/convert.module';
import { NonceModule } from './nonce/nonce.module';



@Module({
  imports: [AuthModule, UserModule,  
    PrismaModule ,ConfigModule.forRoot({isGlobal:true}) , 
    JwtModule.register({global:true}),
    CacheModule.register({isGlobal: true,}) ,
    ConvertModule, ExchangeRatesModule, NonceModule],
})
export class AppModule {}
