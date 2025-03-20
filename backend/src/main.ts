import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe())
   app.enableCors({origin:"http://localhost:5173", credentials:true , allowedHeaders:"Content-Type, Accept, Origin, X-Requested-With, Authorization"})
   app.use(cookieParser())
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
