import { FC, memo } from 'react';
import { ManufacturersTable } from './components/Manufacturers';
import { PaymentTypesTable } from './components/PaymentTypes';
import { ProductTypesTable } from './components/ProductTypes';

import style from './style.module.css';

const OtherTablesComponent: FC = () => (
  <div className={style.container}>
    <div>
      <ManufacturersTable />
    </div>
    <div>
      <PaymentTypesTable />
    </div>
    <div>
      <ProductTypesTable />
    </div>
  </div>
);

export const OtherTables = memo(OtherTablesComponent);
