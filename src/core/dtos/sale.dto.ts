import { BuyerDto } from './buyer.dto';
import { EmployeeDto } from './employee.dto';
import { PaymentTypeDto } from './paymentType.dto';
import { SaleItemDto } from './saleItem.dto';

export interface SaleDto {
  readonly id: number;
  readonly saleItems: SaleItemDto[];
  readonly employee: Omit<EmployeeDto, 'position'>;
  readonly buyer: Pick<BuyerDto, 'name' | 'email' | 'id'>;
  readonly paymentType: PaymentTypeDto;
  readonly saleDate: string;
}
