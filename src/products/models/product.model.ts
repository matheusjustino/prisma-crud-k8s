import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class Product {
	@ApiProperty({ type: String })
	@IsString()
	public id?: string;

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

	@ApiProperty({ type: Date })
	@IsDateString()
	public createdAt?: Date = new Date();

	@ApiProperty({ type: Date })
	@IsDateString()
	public updatedAt?: Date;
}
