import { ManufacturerDto } from '../dtos/manufacturer.dto';
import { Manufacturer } from '../models/manufacturer';
import { MapperFromDto } from './mapper';

class ManufacturerMapper
  implements MapperFromDto<ManufacturerDto, Manufacturer>
{
  /** @inheritdoc */
  public fromDto(dto: ManufacturerDto): Manufacturer {
    return {
      ...dto,
    };
  }
}

export const manufacturerMapper = new ManufacturerMapper();
