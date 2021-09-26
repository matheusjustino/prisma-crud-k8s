import { Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CATEGORIES_INTERFACE } from '../interfaces/category.interface';

@Module({
	controllers: [CategoriesController],
	providers: [
		{
			useClass: CategoriesService,
			provide: CATEGORIES_INTERFACE,
		},
	],
	exports: [
		{
			useClass: CategoriesService,
			provide: CATEGORIES_INTERFACE,
		},
	],
})
export class CategoriesModule {}
