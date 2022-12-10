import { Product } from 'core/models';
import { FC, memo, useState } from 'react';
import ProductService from 'services/ProductService';

import style from './style.module.css';

const ProductsTableComponent: FC = () => {
  const [products, setProducts] = useState<readonly Product[]>([]);

  // eslint-disable-next-line promise/catch-or-return
  ProductService.get().then(setProducts);

  return (
    <>
      <table className={style.table}>
        <caption className={style.caption}>Products</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product name</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr className={style.row} key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.cost}</td>
              <td>{item.type}</td>
              <td>{item.manufacturer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const ProductsTable = memo(ProductsTableComponent);
