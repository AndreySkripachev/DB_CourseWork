import { Buyer } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import BuyerService from 'services/BuyerService';

import style from './style.module.css';

const BuyersTableComponent: FC = () => {
  const [buyers, setBuyers] = useState<readonly Buyer[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<Buyer | null>(null);
  const [newBuyer, setNewBuyer] = useState<Omit<Buyer, 'id'> | null>(null);

  // eslint-disable-next-line promise/catch-or-return
  BuyerService.get().then(setBuyers);

  const handleEdit = (key: keyof Buyer, value: Buyer[typeof key]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

  const handleAddNewBuyer = (key: keyof Buyer, value: Buyer[typeof key]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newBuyer &&
      setNewBuyer({
        ...newBuyer,
        [key]: value,
      });
  };

  return (
    <>
      <table className={style.table}>
        <caption className={style.caption}>
          Buyers
          <button
            type="button"
            className={style.add}
            onClick={() =>
              setNewBuyer({
                address: '',
                email: '',
                name: '',
                phone: '',
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
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((item) => (
            <tr className={style.row} key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
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
            BuyerService.delete(removable);
            setRemovable(null);
          }}
          subtitle="Назад дороги нет"
          title="Please confirm deletion of item"
        />
      )}
      {editable && (
        <Modal>
          <div className={style.editInfo}>Edit menu</div>
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
            <div className={style.editField}>
              <span>Email</span>
              <input
                type="text"
                value={editable.email}
                onChange={({ target: { value } }) => {
                  handleEdit('email', value);
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Phone</span>
              <input
                type="text"
                value={editable.phone}
                onChange={({ target: { value } }) => {
                  handleEdit('phone', value);
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Address</span>
              <input
                type="text"
                value={editable.address}
                onChange={({ target: { value } }) => {
                  handleEdit('address', value);
                }}
              />
            </div>
          </div>
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
      {newBuyer && (
        <Modal>
          <p className={style.modalTitle}>Add new buyer</p>
          <div>
            <div className={style.editField}>
              <span>Name</span>
              <input
                type="text"
                value={newBuyer.name}
                onChange={({ target: { value } }) => {
                  handleAddNewBuyer('name', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Email</span>
              <input
                type="text"
                value={newBuyer.email}
                onChange={({ target: { value } }) => {
                  handleAddNewBuyer('email', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Phone</span>
              <input
                type="text"
                value={newBuyer.phone}
                onChange={({ target: { value } }) => {
                  handleAddNewBuyer('phone', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Address</span>
              <input
                type="text"
                value={newBuyer.address}
                onChange={({ target: { value } }) => {
                  handleAddNewBuyer('address', value.trim());
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                BuyerService.post(newBuyer);
                setNewBuyer(null);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => setNewBuyer(null)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const BuyersTable = memo(BuyersTableComponent);
