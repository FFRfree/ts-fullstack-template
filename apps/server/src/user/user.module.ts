import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TrpcModule } from '@server/trpc/trpc.module';
import { PrismaModule } from '@server/prisma/prisma.module';
import { UserTrpcRouter } from './user.trpc-router';

@Module({
  imports: [TrpcModule, PrismaModule],
  providers: [UserService, UserTrpcRouter],
  exports: [UserTrpcRouter],
})
export class UserModule {}