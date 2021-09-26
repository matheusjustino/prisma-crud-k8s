import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { configureAndBuildSwagger } from './app-config/swagger';
import { HttpExceptionFilter } from './app-config/filters/http-exception.filter';
import { CustomValidationPipe } from './app-config/pipes/custom-validation-pipe.pipe';
import { PrismaService } from './prisma/prisma.service';

const logger: Logger = new Logger('BOOTSTRAP');
async function bootstrap() {
	const PORT = process.env.PORT || 3000;
	const app = await NestFactory.create(AppModule);

	const prismaService: PrismaService = app.get(PrismaService);
	prismaService.enableShutdownHooks(app);

	configureAndBuildSwagger(app);

	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalPipes(new CustomValidationPipe());

	await app.listen(PORT, () =>
		logger.log(`NEST API Running on port ${PORT}`),
	);
}
bootstrap();
