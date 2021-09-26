import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpExceptionFilter } from './filters/http-exception.filter';

@Global()
@Module({
	imports: [ConfigModule.forRoot()],
	providers: [HttpExceptionFilter],
	exports: [HttpExceptionFilter],
})
export class AppConfigModule {}
