import { Buyer } from './buyer';
import { Employee } from './employee';
import { PaymentType } from './paymentType';
import { SaleItem } from './saleItem';

export interface Sale {
  readonly id: number;
  readonly saleItems: SaleItem[];
  readonly employee: Omit<Employee, 'position'>;
  readonly buyer: Pick<Buyer, 'name' | 'email' | 'id'>;
  readonly paymentType: PaymentType;
  readonly saleDate: Date;
}
