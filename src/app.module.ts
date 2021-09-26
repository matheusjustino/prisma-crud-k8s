import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { AppConfigModule } from './app-config/app-config.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [PrismaModule, ProductsModule, AppConfigModule, CategoriesModule],
})
export class AppModule {}
