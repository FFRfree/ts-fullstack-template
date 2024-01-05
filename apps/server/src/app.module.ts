import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrpcModule } from '@server/trpc/trpc.module';
import { MathModule } from './math/math.module';

@Module({
  imports: [ConfigModule.forRoot(), TrpcModule, MathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
