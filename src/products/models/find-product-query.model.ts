import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { StringsUtils } from '../../utils/strings.utils';

export class FindProductQuery {
	@ApiPropertyOptional({
		type: String,
		enum: ['false', 'true'],
		default: 'false',
	})
	@IsString({ groups: ['false', 'true'] })
	@IsOptional()
	public includeCategories?: 'false' | 'true' = 'false';

	@ApiPropertyOptional({ type: [String] })
	@IsArray()
	@IsOptional()
	public categories?: string[];

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public name?: string;

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public price?: string;

	@ApiProperty({ type: String, default: '8' })
	@IsString()
	public pageSize = '8';

	@ApiProperty({ type: String, default: '0' })
	@IsString()
	public page = '0';

	@ApiProperty({
		type: String,
		enum: [StringsUtils.az, StringsUtils.za, StringsUtils.created],
		default: StringsUtils.created,
	})
	@IsString({
		groups: [StringsUtils.az, StringsUtils.za, StringsUtils.created],
	})
	public orderedBy: 'a-z' | 'z-a' | 'created' = 'created';
}
