import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { FindCategoryQuery } from 'src/categories/models/find-category-query.model';

@Injectable()
export class FindCategoryQueryPipe implements PipeTransform<any> {
	public transform(value: FindCategoryQuery, { metatype }: ArgumentMetadata) {
		value.includeProducts = JSON.parse(value.includeProducts.toLowerCase());

		return value;
	}
}
