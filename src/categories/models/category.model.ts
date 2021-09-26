import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

import { Product } from '../../products/models/product.model';

export class Category {
	@ApiProperty({ type: String })
	@IsString()
	public id?: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	public name: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	public description?: string;

	@ApiProperty({ type: [Product] })
	@IsNotEmpty()
	public products: Product[];

	@ApiProperty({ type: Date })
	@IsDateString()
	public createdAt?: Date;

	@ApiProperty({ type: Date })
	@IsDateString()
	public updatedAt?: Date;
}
