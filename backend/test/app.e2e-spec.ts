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


describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let tsCon: ts.StartedTestContainer;
  let prisma: PrismaService;
  let user: User;
  let jwt = '';
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    tsCon = await new TestContainer('postgres', 5432).start();
  const dbport=  tsCon.getFirstMappedPort()
  const conn = `postgresql://gorm:gorm@localhost:${dbport}/design?schema=public`;
  execSync(`dotenv -v DATABASE_URL=${conn}` ,  {stdio:'inherit'});
  execSync('npx prisma db push', { stdio: 'inherit' });
  
    app = moduleFixture.createNestApplication();
    const config = app.get(ConfigService);
   
    const primsa = app.get(PrismaService);
    app.useGlobalPipes(new ValidationPipe());
    const hashPassword = await bcrypt.hash('password1234', 10);
    const user = await primsa.user.create({
      data: {
        email: 'testwewire1@test.com',
        passwordHash: hashPassword,
      },
    });

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
    it('should return a 200', async () => {
      await request(app.getHttpServer())
        .get('/exchange-rates')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200);
    }),
    it('should return a 400', async () => {
      await request(app.getHttpServer())
        .post('/convert')
        .set('Authorization', `Bearer ${jwt}`)
        .send({})
        .expect(400);
    }),
    it('should return a 200', async () => {
      await request(app.getHttpServer())
        .post('/convert')
        .set('Authorization', `Bearer ${jwt}`)
        .set('Content-Type', 'application/json')
        .send({
          from: 'USD',
          to: 'GHS',
          amount: 10,
        })
        .expect(200);
    });
});
