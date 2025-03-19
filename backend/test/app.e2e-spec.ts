import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication , ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { execSync } from 'child_process';
import { ConfigService } from '@nestjs/config';
import  TestContainer from "../testContainer/testContainer"
import * as ts from "testcontainers"
import { PrismaService } from '../src/prisma/prisma.service';
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let tsCon: ts.StartedTestContainer

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

     tsCon =await new TestContainer("postgres" , 5432).start();
  execSync('npx prisma db push  --force-reset', { stdio: 'inherit' });
    
    app = moduleFixture.createNestApplication();
    const config =  app.get(ConfigService);
    config.set(
      'DATABASE_URL',
      'postgresql://gorm:gorm@localhost:5432/design?schema=public',
    );
    
     app.useGlobalPipes(new ValidationPipe())
  

    await app.init();
  });

 
  afterAll(async () => {
    await app.close();
    await tsCon.stop();
  });
  it('/ (GET)', async () => {
   
 
    await request(app.getHttpServer()).post("/auth/signup").send(
      {
        email: "tst@gmail.com" , 
        password:"2123232"
      }
     ).expect(201);
  }) ,

  it("/sign in" , async()=>{
    

      await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'tst@gmail.com',
          password: '2123232',
        })
        .expect(401);
  })
});
