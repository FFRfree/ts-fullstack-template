import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcRouterModule } from './apis/trpc-router/trpc-router.module';
import { UserModule } from './models/user/user.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    // processors and root deps
    ConfigModule.forRoot(),
    PrismaModule,

    // biz modules
    AuthModule,
    UserModule,

    // waiting for all biz modules loaded
    TrpcRouterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
