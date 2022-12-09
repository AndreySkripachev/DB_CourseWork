import { Sale } from 'core/models';
import { FC, memo, useState } from 'react';
import { DropdownMenu } from 'renderer/components/DropdownList/DropdownList';
import SaleService from 'services/SaleService';

import style from './style.module.css';

const SalesTableComponent: FC = () => {
  const [sales, setSales] = useState<readonly Sale[]>([]);

  // eslint-disable-next-line promise/catch-or-return
  SaleService.get().then(setSales);

  return (
    <table className={style.table}>
      <caption className={style.caption}>Sales</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee</th>
          <th>Buyer</th>
          <th>Payment type</th>
          <th>Sale item</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(({ id, buyer, employee, paymentType, saleItems }) => (
          <tr className={style.row} key={id}>
            <td>{id}</td>
            <td>
              <DropdownMenu
                list={[
                  `First name: ${employee.firstName}`,
                  `Last name: ${employee.lastName}`,
                ]}
                title="Employee"
              />
            </td>
            <td>
              {buyer.name} ({buyer.email})
            </td>
            <td>{paymentType}</td>
            <td>
              <DropdownMenu
                list={saleItems.map(
                  (item) => `${item.productName} (${item.count} pcs.)`
                )}
                title="Sale item"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const SalesTable = memo(SalesTableComponent);
