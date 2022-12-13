import { Employee, Sale } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { DropdownMenu } from 'renderer/components/DropdownList/DropdownList';
import { Modal } from 'renderer/components/Modal/Modal';
import EmployeeService from 'services/EmployeeService';
import SaleService from 'services/SaleService';

import style from './style.module.css';

const SalesTableComponent: FC = () => {
  const [sales, setSales] = useState<readonly Sale[]>([]);
  const [employees, setEmployees] = useState<readonly Employee[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<number | null>(null);

  // eslint-disable-next-line promise/catch-or-return
  SaleService.get().then(setSales);

  // eslint-disable-next-line promise/catch-or-return
  EmployeeService.get().then(setEmployees);

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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(({ id, buyer, employee, paymentType, saleItems }) => (
          <tr className={style.row} key={id}>
            <td>{id}</td>
            <td>
              {employee.firstName} {employee.lastName}
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
            <td className={style.actionsBlock}>
              <button type="button" className={style.edit} onClick={() => {}}>
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
        ))}
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
                  value={editable}
                  onChange={({ target: { value } }) =>
                    setEditable(Number(value))
                  }
                >
                  {employees?.map((item) => (
                    <option value={item.id}>
                      {item.firstName} {item.lastName} ({item.position})
                    </option>
                  ))}
                </select>
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
