import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Product } from '../../products/models/product.model';

export class Category {
	@ApiProperty({ type: String })
	@IsString()
	id?: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	description?: string;

	@ApiProperty({ type: [Product] })
	@IsNotEmpty()
	products: Product[];

	@ApiProperty({ type: Date })
	@IsDateString()
	createdAt?: Date;

	@ApiProperty({ type: Date })
	@IsDateString()
	updatedAt?: Date;
}
