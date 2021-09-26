import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	public name: string;

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public description?: string;
}
