import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PRODUCTS_SERVICE } from '../interfaces/product.interface';

@Module({
	controllers: [ProductsController],
	providers: [
		{
			useClass: ProductsService,
			provide: PRODUCTS_SERVICE,
		},
	],
	exports: [
		{
			useClass: ProductsService,
			provide: PRODUCTS_SERVICE,
		},
	],
})
export class ProductsModule {}
