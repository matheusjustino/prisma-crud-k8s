import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public name?: string;

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public description?: string;

	@ApiPropertyOptional({ type: Number })
	@IsNumber()
	@IsOptional()
	public price?: number;

	@ApiPropertyOptional({ type: Boolean })
	@IsBoolean()
	@IsOptional()
	public published?: boolean;
}
