import { Buyer } from './buyer';
import { Employee } from './employee';
import { SaleItem } from './saleItem';

export interface Sale {
  readonly id: number;
  readonly saleItems: SaleItem[];
  readonly employee: Omit<Employee, 'position'>;
  readonly buyer: Pick<Buyer, 'name' | 'email'>;
  readonly paymentType: string;
  readonly saleDate: Date;
}
