import { StringsUtils } from './../../utils/strings.utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindCategoryQuery {
	@ApiPropertyOptional({
		type: String,
		enum: ['false', 'true'],
		default: 'false',
	})
	@IsString({ groups: ['false', 'true'] })
	@IsOptional()
	public includeProducts?: 'false' | 'true' = 'false';

	@ApiPropertyOptional({ type: String })
	@IsString()
	@IsOptional()
	public name?: string;

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
