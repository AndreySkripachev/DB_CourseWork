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

  const handleEdit = (key: keyof Employee, value: Employee[typeof key]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

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
          subtitle="This will lead to irreversible consequences"
          title="Please confirm deletion of item"
        />
      )}
      {editable && (
        <Modal>
          <p className={style.editInfo}>Edit menu</p>
          <div>
            <div className={style.editField}>
              <span>First name</span>
              <input
                type="text"
                value={editable.firstName}
                onChange={({ target: { value } }) => {
                  handleEdit('firstName', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Last name</span>
              <input
                type="text"
                value={editable.lastName}
                onChange={({ target: { value } }) => {
                  handleEdit('lastName', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Patronymic</span>
              <input
                type="text"
                value={editable.patronymic}
                onChange={({ target: { value } }) => {
                  handleEdit('patronymic', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Position</span>
              <input
                type="text"
                value={editable.position}
                onChange={({ target: { value } }) => {
                  handleEdit('position', value.trim());
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                EmployeeService.put(editable);
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

export const EmployeeTable = memo(EmployeeTableComponent);
