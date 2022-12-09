import { Manufacturer } from './manufacturer';

export interface Product {
  readonly id: number;

  readonly name: string;

  readonly cost: number;

  readonly type: string;

  readonly manufacturer: Omit<Manufacturer, 'id'>;
}
