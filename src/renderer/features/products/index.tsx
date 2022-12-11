import { Product } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import ProductService from 'services/ProductService';

import style from './style.module.css';

const ProductsTableComponent: FC = () => {
  const [products, setProducts] = useState<readonly Product[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<Product | null>(null);

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
            <th>Actions</th>
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
              <td className={style.actionsBlock}>
                <button
                  type="button"
                  className={style.edit}
                  onClick={() => setEditable(item)}
                >
                  🖊️
                </button>
                <button
                  type="button"
                  className={style.delete}
                  onClick={() => setRemovable(item.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {removable && (
        <ConfirmationDialog
          onReject={() => setRemovable(null)}
          onSubmit={() => {
            ProductService.delete(removable);
            setRemovable(null);
          }}
          subtitle="Назад дороги нет"
          title="Please confirm deletion of item"
        />
      )}
      {editable && (
        <Modal>
          <div className={style.editInfo}>Edit menu</div>
          <div className={style.editActions}>
            <button type="button" onClick={() => setEditable(null)}>
              Cancel
            </button>
            <button type="button" onClick={() => {}}>
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const ProductsTable = memo(ProductsTableComponent);
