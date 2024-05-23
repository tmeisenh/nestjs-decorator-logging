import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestAwareLogger } from './RequestAwareLogger';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [Logger, RequestAwareLogger, AppService],
})
export class AppModule {}
