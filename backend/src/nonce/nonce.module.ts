import { Global, Module } from '@nestjs/common';
import { NonceService } from './nonce.service';
import { NonceController } from './nonce.controller';
@Global()
@Module({
  exports:[NonceService],
  providers: [NonceService],
  controllers: [NonceController]
})
export class NonceModule {}
