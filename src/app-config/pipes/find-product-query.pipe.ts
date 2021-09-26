import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

// MODELS
import { FindProductQuery } from 'src/products/models/find-product-query.model';

@Injectable()
export class FindProductQueryPipe implements PipeTransform<any> {
	public transform(value: FindProductQuery, { metatype }: ArgumentMetadata) {
		value.includeCategories = JSON.parse(
			value.includeCategories.toLowerCase(),
		);

		return value;
	}
}
