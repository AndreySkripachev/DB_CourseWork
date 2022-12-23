import { Buyer, Employee, Sale } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { DropdownMenu } from 'renderer/components/DropdownList/DropdownList';
import { Modal } from 'renderer/components/Modal/Modal';
import BuyerService from 'services/BuyerService';
import EmployeeService from 'services/EmployeeService';
import SaleService from 'services/SaleService';

import style from './style.module.css';

interface EditableSale {
  readonly id: number;
  readonly employee: number;
  readonly buyer: number;
  readonly paymentType: number;
  readonly saleDate: Date;
}

const SalesTableComponent: FC = () => {
  const [sales, setSales] = useState<readonly Sale[]>([]);
  const [employees, setEmployees] = useState<readonly Employee[]>([]);
  const [buyers, setBuyers] = useState<readonly Buyer[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<EditableSale | null>(null);

  const handleEdit = (
    key: keyof EditableSale,
    value: EditableSale[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

  // eslint-disable-next-line promise/catch-or-return
  SaleService.get().then(setSales);

  // eslint-disable-next-line promise/catch-or-return
  EmployeeService.get().then(setEmployees);

  // eslint-disable-next-line promise/catch-or-return
  BuyerService.get().then(setBuyers);

  return (
    <table className={style.table}>
      <caption className={style.caption}>Sales</caption>
      <thead>
        <tr>
          <th>№</th>
          <th>Employee</th>
          <th>Buyer</th>
          <th>Payment type</th>
          <th>Sale item</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(
          ({ id, buyer, employee, paymentType, saleItems, saleDate }, i) => (
            <tr className={style.row} key={id}>
              <td>{i + 1}</td>
              <td>
                {employee.firstName} {employee.lastName}
              </td>
              <td>
                {buyer.name} ({buyer.email})
              </td>
              <td>{paymentType.name}</td>
              <td>
                <DropdownMenu
                  list={saleItems.map(
                    (item) => `${item.productName} (${item.count} pcs.)`
                  )}
                  title="Sale item"
                />
              </td>
              <td>{saleDate.toISOString().split('T')[0]}</td>
              <td className={style.actionsBlock}>
                <button
                  type="button"
                  className={style.edit}
                  onClick={() => {
                    setEditable({
                      id,
                      buyer: buyer.id,
                      employee: employee.id,
                      paymentType: paymentType.id,
                      saleDate,
                    });
                  }}
                >
                  🖊️
                </button>
                <button
                  type="button"
                  className={style.delete}
                  onClick={() => {
                    setRemovable(id);
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          )
        )}
        {removable && (
          <ConfirmationDialog
            onReject={() => setRemovable(null)}
            onSubmit={() => {
              SaleService.delete(removable);
              setRemovable(null);
            }}
            subtitle="Назад дороги нет"
            title="Please confirm deletion of item"
          />
        )}
        {editable && (
          <Modal>
            <p className={style.modalTitle}>Edit menu</p>
            <div>
              <div className={style.editFiled}>
                <span>Employee</span>
                <select
                  value={editable.employee}
                  onChange={({ target: { value } }) =>
                    handleEdit('employee', Number(value))
                  }
                >
                  {employees?.map((item) => (
                    <option value={item.id}>
                      {item.firstName} {item.lastName} ({item.position})
                    </option>
                  ))}
                </select>
              </div>
              <div className={style.editFiled}>
                <span>Buyer</span>
                <select
                  value={editable.buyer}
                  onChange={({ target: { value } }) =>
                    handleEdit('buyer', Number(value))
                  }
                >
                  {buyers.map((item) => (
                    <option value={item.id}>
                      {item.name} ({item.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className={style.editField}>
                <span>Sale date</span>
                <input
                  type="date"
                  value={editable.saleDate.toISOString().split('T')[0]}
                  onChange={({ target: { value } }) =>
                    handleEdit('saleDate', new Date(value))
                  }
                />
              </div>
            </div>
            <div className={style.editActions}>
              <button
                type="button"
                className={style.edit}
                onClick={() => {
                  SaleService.put(editable);
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
      </tbody>
    </table>
  );
};

export const SalesTable = memo(SalesTableComponent);
