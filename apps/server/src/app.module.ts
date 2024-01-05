import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcRouterModule } from './trpc-router/trpc-router.module';

@Module({
  imports: [ConfigModule.forRoot(), TrpcRouterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
