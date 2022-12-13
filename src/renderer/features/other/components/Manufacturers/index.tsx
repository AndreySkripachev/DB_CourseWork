import { Manufacturer } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { Modal } from 'renderer/components/Modal/Modal';
import ManufacturerService from 'services/ManufacturerService';

import style from './style.module.css';

const ManufacturersTableComponent: FC = () => {
  const [manufacturers, setManufacturers] = useState<readonly Manufacturer[]>(
    []
  );
  const [editable, setEditable] = useState<Manufacturer | null>(null);
  const [removable, setRemovable] = useState<number | null>(null);
  const [newManufacturer, setNewManufacturer] = useState<Omit<
    Manufacturer,
    'id'
  > | null>(null);

  // eslint-disable-next-line promise/catch-or-return
  ManufacturerService.get().then(setManufacturers);

  const handleEdit = (
    key: keyof Manufacturer,
    value: Manufacturer[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editable &&
      setEditable({
        ...editable,
        [key]: value,
      });
  };

  const handleAddNewUser = (
    key: keyof Manufacturer,
    value: Manufacturer[typeof key]
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newManufacturer &&
      setNewManufacturer({
        ...newManufacturer,
        [key]: value,
      });
  };

  return (
    <>
      <table className={style.table}>
        <caption className={style.caption}>
          Manufacturers
          <button
            type="button"
            className={style.add}
            onClick={() =>
              setNewManufacturer({
                country: '',
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
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((item) => (
            <tr className={style.row}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.country}</td>
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
            ManufacturerService.delete(removable);
            setRemovable(null);
          }}
          subtitle="This will lead to irreversible consequences"
          title="Please confirm deletion of item"
        />
      )}
      {editable && (
        <Modal>
          <p className={style.modalTitle}>Edit menu</p>
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
            <div className={style.editField}>
              <span>Country</span>
              <input
                type="text"
                value={editable.country}
                onChange={({ target: { value } }) => {
                  handleEdit('country', value.trim());
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                ManufacturerService.put(editable);
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
      {newManufacturer && (
        <Modal>
          <p className={style.modalTitle}>Add new manufacturer</p>
          <div>
            <div className={style.editField}>
              <span>Name</span>
              <input
                type="text"
                value={newManufacturer.name}
                onChange={({ target: { value } }) => {
                  handleAddNewUser('name', value.trim());
                }}
              />
            </div>
            <div className={style.editField}>
              <span>Country</span>
              <input
                type="text"
                value={newManufacturer.country}
                onChange={({ target: { value } }) => {
                  handleAddNewUser('country', value.trim());
                }}
              />
            </div>
          </div>
          <div className={style.editActions}>
            <button
              type="button"
              className={style.edit}
              onClick={() => {
                ManufacturerService.post(newManufacturer);
                setNewManufacturer(null);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className={style.cancel}
              onClick={() => setNewManufacturer(null)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export const ManufacturersTable = memo(ManufacturersTableComponent);
