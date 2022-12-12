import { BuyerDto } from './buyer.dto';
import { EmployeeDto } from './employee.dto';
import { SaleItemDto } from './saleItem.dto';

export interface SaleDto {
  readonly id: number;
  readonly saleItems: SaleItemDto[];
  readonly employee: Omit<EmployeeDto, 'position'>;
  readonly buyer: Pick<BuyerDto, 'name' | 'email'>;
  readonly paymentType: string;
}
