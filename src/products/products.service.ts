import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

// DTOS
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// MODELS
import { Product } from '@prisma/client';
import { FindProductQuery } from './models/find-product-query.model';

// UTILS
import { StringsUtils } from '../utils/strings.utils';

// INTERFACES
import { IProductsService } from '../interfaces/product.interface';

@Injectable()
export class ProductsService implements IProductsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create({
		categories,
		...dataProduct
	}: CreateProductDto): Promise<Product> {
		const newProduct = await this.prismaService.product.create({
			data: {
				...dataProduct,
				categories: {
					connect: [
						...categories.map((id) => {
							return {
								id,
							};
						}),
					],
				},
			},
		});
		return newProduct;
	}

	public async findAll(query?: FindProductQuery): Promise<Product[]> {
		const skip = Number(query.page) * Number(query.pageSize);

		const products = await this.prismaService.product.findMany({
			where: {
				name: query.name,
				price: query.price,
				categories: {
					some: {
						id: {
							in: query.categories,
						},
					},
				},
			},
			include: {
				categories: Boolean(query.includeCategories),
			},
			skip,
			take: Number(query.pageSize),
			orderBy: this.mapOrderedBy(query.orderedBy),
		});

		return products;
	}

	public async findOne(id: string): Promise<Product> {
		const product = await this.prismaService.product.findUnique({
			where: {
				id,
			},
			include: {
				categories: true,
			},
		});
		if (!product) {
			throw new NotFoundException(StringsUtils.productNotFound);
		}

		return product;
	}

	public async update(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		const product = await this.prismaService.product.update({
			where: {
				id,
			},
			data: updateProductDto,
		});
		if (!product) {
			throw new NotFoundException(StringsUtils.productNotFound);
		}

		return product;
	}

	public async remove(id: string): Promise<Product> {
		const product = await this.prismaService.product.delete({
			where: {
				id,
			},
		});
		if (!product) {
			throw new NotFoundException(StringsUtils.productNotFound);
		}

		return product;
	}

	private mapOrderedBy(orderBy: string): { [string: string]: string } {
		switch (orderBy.toLocaleLowerCase()) {
			case StringsUtils.created:
				return {
					createdAt: 'asc',
				};
			case StringsUtils.az:
				return {
					name: 'asc',
				};
			case StringsUtils.za:
				return {
					name: 'desc',
				};
			default:
				throw new BadRequestException(StringsUtils.invalidOrderBy);
		}
	}
}
