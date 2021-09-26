import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

// UTILS
import { StringsUtils } from '../utils/strings.utils';

// SERVICES
import { PrismaService } from 'src/prisma/prisma.service';

// DTOS
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// ENTITIES
import { Category } from '@prisma/client';

// MODELS
import { FindCategoryQuery } from './models/find-category-query.model';

// INTERFACES
import { ICategoriesInterface } from '../interfaces/category.interface';

@Injectable()
export class CategoriesService implements ICategoriesInterface {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(
		createCategoryDto: CreateCategoryDto,
	): Promise<Category> {
		const category = await this.prismaService.category.create({
			data: createCategoryDto,
		});
		return category;
	}

	public async findAll(query: FindCategoryQuery): Promise<Category[]> {
		const skip = Number(query.page) * Number(query.pageSize);

		const categories = await this.prismaService.category.findMany({
			where: {
				name: query.name,
			},
			include: {
				products: Boolean(query.includeProducts),
			},
			skip,
			take: Number(query.pageSize),
			orderBy: this.mapOrderedBy(query.orderedBy),
		});
		return categories;
	}

	public async findOne(id: string): Promise<Category> {
		const category = await this.prismaService.category.findUnique({
			where: {
				id,
			},
		});
		if (!category) {
			throw new NotFoundException(StringsUtils.categoryNotFound);
		}

		return category;
	}

	public async update(
		id: string,
		updateCategoryDto: UpdateCategoryDto,
	): Promise<Category> {
		const category = await this.prismaService.category.update({
			where: {
				id,
			},
			data: updateCategoryDto,
		});
		if (!category) {
			throw new NotFoundException(StringsUtils.categoryNotFound);
		}

		return category;
	}

	public async remove(id: string): Promise<Category> {
		const category = await this.prismaService.category.delete({
			where: {
				id,
			},
		});
		if (!category) {
			throw new NotFoundException(StringsUtils.categoryNotFound);
		}

		return category;
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
