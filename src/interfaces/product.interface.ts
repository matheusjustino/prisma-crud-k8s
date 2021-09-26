import { Product } from '.prisma/client';

import { FindProductQuery } from '../products/models/find-product-query.model';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';

export const PRODUCTS_SERVICE = 'PRODUCTS SERVICE';
export interface IProductsService {
	create({ categories, ...dataProduct }: CreateProductDto): Promise<Product>;
	findAll(query?: FindProductQuery): Promise<Product[]>;
	findOne(id: string): Promise<Product>;
	update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
	remove(id: string): Promise<Product>;
}
