import { Category } from '.prisma/client';
import { FindCategoryQuery } from '../categories/models/find-category-query.model';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';

export const CATEGORIES_INTERFACE = 'CATEGORIES INTERFACE';
export interface ICategoriesInterface {
	create(createCategoryDto: CreateCategoryDto): Promise<Category>;
	findAll(query: FindCategoryQuery): Promise<Category[]>;
	findOne(id: string): Promise<Category>;
	update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
	remove(id: string): Promise<Category>;
}
