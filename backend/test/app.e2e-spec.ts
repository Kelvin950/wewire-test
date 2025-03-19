import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication , ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import  TestContainer from "../testContainer/testContainer"
import * as ts from "testcontainers"
import { PrismaService } from '../src/prisma/prisma.service';
import { User } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let tsCon: ts.StartedTestContainer
  let prisma:PrismaService
  let user: User
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

     tsCon =await new TestContainer("postgres" , 5432).start();
 
    
    app = moduleFixture.createNestApplication();
    const config =  app.get(ConfigService);
    config.set(
      'DATABASE_URL',
      'postgresql://gorm:gorm@localhost:5432/design?schema=public',
    );
    const primsa =  app.get(PrismaService)
     app.useGlobalPipes(new ValidationPipe())
     const hashPassword = await bcrypt.hash("password1234" , 10)
   const user =  await primsa.user.create({
    data:{
      email:"testwewire@test.com" , 
      passwordHash: hashPassword
    }
   })

    await app.init();
  });

 
  afterAll(async () => {
    await app.close();
    await tsCon.stop();
  });
  

  it('/should return a 401', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'tst@gmail.com',
        password: '2123232',
      })
      .expect(401);
  }),


    it('/should return a 200', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'testwewire@test.com',
          password: 'password1234',
        })
        .expect(401);
    }) ,


  it("should return  a 401  if jwt is not passed" , async()=>{
     
    await  request(app.getHttpServer()).get("/exchange-rates").expect(401) 
  
  })
 ,

 it("should return a 200" , async()=>{
    
     await request(app.getHttpServer()).get('/exchange-rates').expect(401).set(
      "Authorization", ""
     ).expect(200)
 }) ,

 it("should return a 400" , async()=>{
   await request(app.getHttpServer()).post("/convert").send({

   }).expect(400)
 }) ,

 it("should return a 200" , async()=>{
  await request(app.getHttpServer()).post("/convert").send({}).expect(400);
 })
 
});
