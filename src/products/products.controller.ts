import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Res,
	HttpStatus,
	Query,
	Inject,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

// DTOS
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// MODELS
import { FindProductQuery } from './models/find-product-query.model';
import { Product } from './models/product.model';

// PIPES
import { FindProductQueryPipe } from '../app-config/pipes/find-product-query.pipe';

// INTERFACES
import {
	IProductsService,
	PRODUCTS_SERVICE,
} from '../interfaces/product.interface';

@ApiTags('[PRODUCTS CONTROLLER]')
@Controller('products')
export class ProductsController {
	constructor(
		@Inject(PRODUCTS_SERVICE)
		private readonly productsService: IProductsService,
	) {}

	@Post()
	@ApiOkResponse({ status: HttpStatus.CREATED, description: 'OK' })
	public async create(
		@Body() createProductDto: CreateProductDto,
		@Res() res: Response,
	) {
		await this.productsService.create(createProductDto);
		return res.status(HttpStatus.CREATED).json();
	}

	@Get()
	@ApiOkResponse({ status: HttpStatus.OK, type: [Product] })
	public async findAll(
		@Query(FindProductQueryPipe) query: FindProductQuery,
		@Res() res: Response,
	) {
		const products = await this.productsService.findAll(query);
		return res.status(HttpStatus.OK).json(products);
	}

	@Get(':id')
	@ApiOkResponse({ status: HttpStatus.OK, type: Product })
	public async findOne(@Param('id') id: string, @Res() res: Response) {
		const product = await this.productsService.findOne(id);
		return res.status(HttpStatus.OK).json(product);
	}

	@Put(':id')
	@ApiOkResponse({ status: HttpStatus.OK, type: Product })
	public async update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto,
		@Res() res: Response,
	) {
		const product = await this.productsService.update(id, updateProductDto);
		return res.status(HttpStatus.OK).json(product);
	}

	@Delete(':id')
	@ApiOkResponse({ status: HttpStatus.OK, type: Product })
	public async remove(@Param('id') id: string, @Res() res: Response) {
		const product = await this.productsService.remove(id);
		return res.status(HttpStatus.OK).json(product);
	}
}
