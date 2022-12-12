import { PaymentType } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import PaymentTypeService from 'services/PaymentTypeService';

import style from './style.module.css';

const PaymentTypesTableComponent: FC = () => {
  const [paymentTypes, setPaymentTypes] = useState<readonly PaymentType[]>([]);
  const [editable, setEditable] = useState<PaymentType | null>(null);
  const [removable, setRemovable] = useState<number | null>(null);
  const [newPaymentType, setNewPaymentType] = useState<Omit<
    PaymentType,
    'id'
  > | null>(null);

  // eslint-disable-next-line promise/catch-or-return
  PaymentTypeService.get().then(setPaymentTypes);

  const handleEdit = (
    key: keyof PaymentType,
    value: PaymentType[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

  const handleAddNewUser = (
    key: keyof PaymentType,
    value: PaymentType[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newPaymentType &&
      setNewPaymentType({
        ...newPaymentType,
        [key]: value,
      });
  };

  return (
    <>
      <table>
        <caption className={style.caption}>
          Payment Types
          <button
            type="button"
            className={style.add}
            onClick={() =>
              setNewPaymentType({
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
          {paymentTypes.map((item) => (
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
            PaymentTypeService.delete(removable);
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
                setNewPaymentType({
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
                PaymentTypeService.put(editable);
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
      {newPaymentType && (
        <Modal>
          <p className={style.modalTitle}>Add new payment type</p>
          <div>
            <div className={style.editField}>
              <span>Name</span>
              <input
                type="text"
                value={newPaymentType.name}
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
                PaymentTypeService.post(newPaymentType);
                setNewPaymentType(null);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => setNewPaymentType(null)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const PaymentTypesTable = memo(PaymentTypesTableComponent);
