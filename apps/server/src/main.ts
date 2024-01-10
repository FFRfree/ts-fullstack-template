import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouterService } from './apis/trpc-router/trpc-router.service';
import { ZodFilter } from './common/filters/zod.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ZodFilter());
  const trpc = app.get(TrpcRouterService);
  trpc.applyMiddleware(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
