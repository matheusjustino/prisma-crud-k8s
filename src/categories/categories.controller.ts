import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	HttpStatus,
	Query,
	Inject,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

// PIPES
import { FindCategoryQueryPipe } from '../app-config/pipes/find-category-query.pipe';

// INTERFACES
import {
	CATEGORIES_INTERFACE,
	ICategoriesInterface,
} from '../interfaces/category.interface';

// DTOS
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// MODELS
import { Category } from './models/category.model';
import { FindCategoryQuery } from './models/find-category-query.model';

@ApiTags('[CATEGORIES CONTROLLER]')
@Controller('categories')
export class CategoriesController {
	constructor(
		@Inject(CATEGORIES_INTERFACE)
		private readonly categoriesService: ICategoriesInterface,
	) {}

	@Post()
	@ApiOkResponse({ status: HttpStatus.CREATED, description: 'OK' })
	public async create(
		@Body() createCategoryDto: CreateCategoryDto,
		@Res() res: Response,
	) {
		await this.categoriesService.create(createCategoryDto);
		return res.status(HttpStatus.CREATED).json();
	}

	@Get()
	@ApiOkResponse({ status: HttpStatus.OK, type: [Category] })
	public async findAll(
		@Query(FindCategoryQueryPipe) query: FindCategoryQuery,
		@Res() res: Response,
	) {
		const categories = await this.categoriesService.findAll(query);
		return res.status(HttpStatus.OK).json(categories);
	}

	@Get(':id')
	@ApiOkResponse({ status: HttpStatus.OK, type: Category })
	public async findOne(@Param('id') id: string, @Res() res: Response) {
		const category = await this.categoriesService.findOne(id);
		return res.status(HttpStatus.OK).json(category);
	}

	@Patch(':id')
	@ApiOkResponse({ status: HttpStatus.OK, type: Category })
	public async update(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
		@Res() res: Response,
	) {
		const category = await this.categoriesService.update(
			id,
			updateCategoryDto,
		);
		return res.status(HttpStatus.OK).json(category);
	}

	@Delete(':id')
	@ApiOkResponse({ status: HttpStatus.OK, type: Category })
	public async remove(@Param('id') id: string, @Res() res: Response) {
		const category = await this.categoriesService.remove(id);
		return res.status(HttpStatus.OK).json(category);
	}
}
