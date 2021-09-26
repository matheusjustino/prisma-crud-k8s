import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateProductDto {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	public name: string;

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public description?: string;

	@ApiProperty({ type: Number })
	@IsNumber()
	@IsNotEmpty()
	public price: number;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	public sku: string;

	@ApiProperty({ type: Boolean, default: false })
	@IsBoolean()
	public published = false;

	@ApiProperty({ type: [String] })
	@IsArray()
	@IsNotEmpty()
	public categories: string[];
}
