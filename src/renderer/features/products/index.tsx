import { Manufacturer, Product, ProductType } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import ManufacturerService from 'services/ManufacturerService';
import ProductService from 'services/ProductService';
import ProductTypeService from 'services/ProductsTypeService';

import style from './style.module.css';

type EditProduct = Pick<Product, 'cost' | 'name'> & {
  manufacturer: number;
  type: number;
};

const ProductsTableComponent: FC = () => {
  const [products, setProducts] = useState<readonly Product[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<EditProduct | null>(null);

  const [manufacturers, setManufacturers] = useState<
    readonly Manufacturer[] | null
  >(null);

  const [types, setTypes] = useState<readonly ProductType[] | null>(null);

  const handleEdit = (
    key: keyof EditProduct,
    value: EditProduct[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

  // eslint-disable-next-line promise/catch-or-return
  ProductService.get().then(setProducts);
  // eslint-disable-next-line promise/catch-or-return
  ManufacturerService.get().then(setManufacturers);
  // eslint-disable-next-line promise/catch-or-return
  ProductTypeService.get().then(setTypes);

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
              <td>{item.type.name}</td>
              <td>{item.manufacturer.name}</td>
              <td className={style.actionsBlock}>
                <button
                  type="button"
                  className={style.edit}
                  onClick={() =>
                    setEditable({
                      cost: item.cost,
                      manufacturer: item.manufacturer.id,
                      name: item.name,
                      type: item.type.id,
                    })
                  }
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
          subtitle=""
          title="Please confirm deletion of item"
        />
      )}
      {editable && (
        <Modal>
          <div className={style.modalTitle}>Edit menu</div>
          <div>
            <div className={style.editField}>
              <span>Name</span>
              <input
                type="text"
                value={editable.name}
                onChange={({ target: { value } }) => {
                  handleEdit('name', value);
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                ProductService.put(editable);
                setEditable(null);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => setEditable(null)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const ProductsTable = memo(ProductsTableComponent);
