import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './CustomLogger';

async function bootstrap() {
  const customLogger = new CustomLogger('The CustomLogger', {
    logLevels: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'],
  });

  const app = await NestFactory.create(AppModule, { logger: customLogger });
  await app.listen(3000);
}
bootstrap();
