import { ManufacturerDto } from './manufacturer.dto';

export interface ProductDto {
  readonly id: number;

  readonly name: string;

  readonly cost: number;

  readonly type: string;

  readonly manufacturer: Omit<ManufacturerDto, 'id'>;
}
