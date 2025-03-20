import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import TestContainer from '../testContainer/testContainer';
import * as ts from 'testcontainers';
import { PrismaService } from '../src/prisma/prisma.service';
import { User } from '@prisma/client';
import { execSync } from 'child_process';
import * as cookieParser from 'cookie-parser';


describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let tsCon: ts.StartedTestContainer;
  let prisma: PrismaService;
  let user: User;
  let jwt = '';
  const nonce = ""
  beforeAll(async () => {
   

    tsCon = await new TestContainer('postgres', 5432).start();
  const dbport=  tsCon.getFirstMappedPort()
  const connUrl = `postgresql://gorm:gorm@localhost:${dbport}/design?schema=public`;
  process.env.DATABASE_URL = connUrl;
  execSync(`dotenv -v DATABASE_URL=${connUrl} -- npx prisma migrate dev` ,  {stdio:'inherit'});
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).overrideProvider(ConfigService).useValue(
    {
      get:(key:string)=>{
        if (key === 'DATABASE_URL') return connUrl;
        if(key == "JWT_SECRET") return "Test1234"; 
        if(key== "JWT_SECRET_NONCE") return "TestNonce";

        return process.env[key];
      }
    }
  ).compile();
  
    app = moduleFixture.createNestApplication();
    const config = app.get(ConfigService);
 
    const primsa = app.get(PrismaService);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser())
    const hashPassword = await bcrypt.hash('password1234', 10);

    const user = await primsa.user.create({
      data: {
        email: 'testwewire@test.com',
        passwordHash: hashPassword,
      },
    });
console.log("user" , user)
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
     const res=  await request(app.getHttpServer())
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'testwewire@test.com',
          password: 'password1234',
        })
        .expect(200);

        jwt =  res.body["token"]
    }),
    it('should return  a 401  if jwt is not passed', async () => {
      await request(app.getHttpServer()).get('/exchange-rates').expect(401);
    }),
    it("should return a 200 and cookie must be set" , async ()=>{
      const res =  await request(app.getHttpServer()).
      get("/nonce").expect(200).
      set('Authorization', `Bearer ${jwt}`)
 
      expect(res.headers["set-cookie"].length).toBeGreaterThan(0)
     
    }),

    it('should return a 401', async () => {
      await request(app.getHttpServer())
        .get('/exchange-rates')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(401);
    }),

    it('should return a 200', async () => {

      const res = await request(app.getHttpServer()).
      get("/nonce").
      set('Authorization', `Bearer ${jwt}`).
      expect(200)

      const cookie =  res.headers["set-cookie"]
    
      await request(app.getHttpServer())
        .get('/exchange-rates')
        .set('Authorization', `Bearer ${jwt}`)
        .set('Cookie', cookie)
        .expect(200);
    }),

    it('should return a 401', async () => {
      await request(app.getHttpServer())
        .post('/convert')
        .set('Authorization', `Bearer ${jwt}`)
        .send({})
        .expect(401);
    }),

    it('should return a 400', async () => {
      const res = await request(app.getHttpServer()).
      get("/nonce").
      set('Authorization', `Bearer ${jwt}`).
      expect(200)

      const cookie =  res.headers["set-cookie"]
        

      await request(app.getHttpServer())
        .post('/convert')
        .set('Authorization', `Bearer ${jwt}`)
        .set('Cookie', cookie)
        .send({})
        .expect(400);
    }),

 
    it('should return a 200', async () => {
      
      const res = await request(app.getHttpServer()).
      get("/nonce").
      set('Authorization', `Bearer ${jwt}`).
      expect(200)

      const cookie =  res.headers["set-cookie"]

      await request(app.getHttpServer())
        .post('/convert')
        .set('Authorization', `Bearer ${jwt}`)
        .set('Content-Type', 'application/json')
        .set('Cookie', cookie)
        .send({
          from: 'USD',
          to: 'GHS',
          amount: 10,
        })
        .expect(201);
    }) ,

     it("should return a transaction history" ,async()=>{
      const res = await request(app.getHttpServer()).
      get("/nonce").
      set('Authorization', `Bearer ${jwt}`).
      expect(200)

      const cookie =  res.headers["set-cookie"]


      await request(app.getHttpServer()).get("/user/transactions")
      .set('Authorization', `Bearer ${jwt}`)
      .set('Content-Type', 'application/json')
      .set('Cookie', cookie)
      .expect(200)

     }),

    it("should return a 401 when  nonce is used" ,async()=>{
      const res = await request(app.getHttpServer()).
      get("/nonce").
      set('Authorization', `Bearer ${jwt}`).
      expect(200)

      const cookie =  res.headers["set-cookie"]

      await request(app.getHttpServer())
      .get('/exchange-rates')
      .set('Authorization', `Bearer ${jwt}`)
      .set('Cookie', cookie)
      .expect(200);

      await request(app.getHttpServer())
        .post('/convert')
        .set('Authorization', `Bearer ${jwt}`)
        .set('Content-Type', 'application/json')
        .set('Cookie', cookie)
        .send({
          from: 'USD',
          to: 'GHS',
          amount: 10,
        })
        .expect(401);
    })
});
