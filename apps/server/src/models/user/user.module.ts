import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '@server/database/prisma/prisma.module';
import { UserTrpcRouter } from './user.trpc-router';

@Module({
  imports: [],
  providers: [UserService, UserTrpcRouter],
  exports: [UserTrpcRouter, UserService],
})
export class UserModule {}
