import { Employee } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import EmployeeService from 'services/EmployeeService';

import style from './style.module.css';

const EmployeeTableComponent: FC = () => {
  const [employees, setEmployees] = useState<readonly Employee[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<Employee | null>(null);

  // eslint-disable-next-line promise/catch-or-return
  EmployeeService.get().then(setEmployees);

  return (
    <>
      <table className={style.table}>
        <caption className={style.caption}>Employees</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Patronymic</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item) => (
            <tr className={style.row} key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.patronymic}</td>
              <td>{item.position}</td>
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
            EmployeeService.delete(removable);
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

export const EmployeeTable = memo(EmployeeTableComponent);
