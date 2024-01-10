import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '@server/models/user/user.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello Tom!');
  });

  it('should return token', async () => {
    const payload = { username: 'ffr', password: '123' };
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(payload);
    expect(response).toBeDefined();
  });

  it('can findAll users', async () => {
    const users = await app.get(UserService).findAll();

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });
});
