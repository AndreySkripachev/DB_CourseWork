import { ProductType } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import ProductTypeService from 'services/ProductsTypeService';

import style from './style.module.css';

const ProductTypesTableComponent: FC = () => {
  const [productTypes, setProductTypes] = useState<readonly ProductType[]>([]);
  const [editable, setEditable] = useState<ProductType | null>(null);
  const [removable, setRemovable] = useState<number | null>(null);
  const [newProductType, setNewProductType] = useState<Omit<
    ProductType,
    'id'
  > | null>(null);

  // eslint-disable-next-line promise/catch-or-return
  ProductTypeService.get().then(setProductTypes);

  const handleEdit = (
    key: keyof ProductType,
    value: ProductType[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

  const handleAddNewUser = (
    key: keyof ProductType,
    value: ProductType[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newProductType &&
      setNewProductType({
        ...newProductType,
        [key]: value,
      });
  };

  return (
    <>
      <table className={style.table}>
        <caption className={style.caption}>
          Product Types
          <button
            type="button"
            className={style.add}
            onClick={() =>
              setNewProductType({
                name: '',
              })
            }
          >
            +
          </button>
        </caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productTypes.map((item) => (
            <tr className={style.row}>
              <td>{item.id}</td>
              <td>{item.name}</td>
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
            ProductTypeService.delete(removable);
            setRemovable(null);
          }}
          subtitle="This will lead to irreversible consequences"
          title="Please confirm deletion of item"
        />
      )}
      {editable && (
        <Modal>
          <p className={style.modalTitle}>
            Edit menu
            <button
              type="button"
              className={style.add}
              onClick={() =>
                setNewProductType({
                  name: '',
                })
              }
            >
              +
            </button>
          </p>
          <div>
            <div className={style.editField}>
              <span>Name</span>
              <input
                type="text"
                value={editable.name}
                onChange={({ target: { value } }) => {
                  handleEdit('name', value.trim());
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                ProductTypeService.put(editable);
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
      {newProductType && (
        <Modal>
          <p className={style.modalTitle}>Add new type of product</p>
          <div>
            <div className={style.editField}>
              <span>Name</span>
              <input
                type="text"
                value={newProductType.name}
                onChange={({ target: { value } }) => {
                  handleAddNewUser('name', value.trim());
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                ProductTypeService.post(newProductType);
                setNewProductType(null);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => setNewProductType(null)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const ProductTypesTable = memo(ProductTypesTableComponent);
