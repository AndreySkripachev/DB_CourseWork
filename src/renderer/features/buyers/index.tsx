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

  // eslint-disable-next-line promise/catch-or-return
  BuyerService.get().then(setBuyers);

  return (
    <>
      <table className={style.table}>
        <caption className={style.caption}>Buyers</caption>
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

export const BuyersTable = memo(BuyersTableComponent);
