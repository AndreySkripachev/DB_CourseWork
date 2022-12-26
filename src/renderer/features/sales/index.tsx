import { Buyer, Employee, PaymentType, Sale, Product } from 'core/models';
import { FC, memo, useState } from 'react';
import { ConfirmationDialog } from 'renderer/components/ConfirmationDialog/ConfirmationDialog';
import { DropdownMenu } from 'renderer/components/DropdownList/DropdownList';
import { Modal } from 'renderer/components/Modal/Modal';
import BuyerService from 'services/BuyerService';
import EmployeeService from 'services/EmployeeService';
import PaymentTypeService from 'services/PaymentTypeService';
import ProductService from 'services/ProductService';
import SaleService from 'services/SaleService';
import SaleItemService from 'services/SaleItemService';

import style from './style.module.css';

interface EditableSale {
  readonly id: number;
  readonly employee: number;
  readonly buyer: number;
  readonly paymentType: number;
  readonly saleDate: Date;
}

interface NewSale {
  readonly employee: number;
  readonly buyer: number;
  readonly paymentType: number;
}

interface NewSaleItem {
  readonly product: number;
  readonly sale: number;
  readonly count: number;
}

const defaultSaleItem: NewSaleItem = {
  count: 0,
  product: 0,
  sale: 0,
};

const Report: FC<{ sales: readonly Sale[] }> = ({ sales }) => {
  return (
    <div className={style.report}>
      <div>
        <b className={style.reportTitle}>Sales</b>
      </div>
      <div className={style.reportItemBlock}>
        {sales.map((item) => {
          return (
            <div key={item.id} className={style.reportItem}>
              <div className={style.itemInfo}>
                {item.employee.firstName} {item.employee.lastName} →{' '}
                {item.buyer.name} ({item.buyer.email})
              </div>
              <div className={style.itemInfo}>
                Sale date: {item.saleDate.toISOString().split('T')[0]}
              </div>
              {item.saleItems.map(({ count, id, productName, cost }) => (
                <div key={id} className={style.reportItemField}>
                  <div className={style.fieldDescription}>
                    {productName} ({count} psc.)
                  </div>
                  <div className={style.fieldData}>{cost}₽</div>
                </div>
              ))}
              <div className={style.reportItemField}>
                <div className={style.fieldDescription}>
                  <b>Total</b>
                </div>
                <div className={style.fieldData}>
                  <b>
                    {item.saleItems.reduce((a, b) => a + b.cost * b.count, 0)}₽
                  </b>
                </div>
              </div>
            </div>
          );
        })}
        <div className={style.reportFooter}>
          <b>Sold total:</b>
          <b>
            {sales.reduce(
              (acc, sale) =>
                acc + sale.saleItems.reduce((a, b) => a + b.cost * b.count, 0),
              0
            )}
            ₽
          </b>
        </div>
      </div>
    </div>
  );
};

const SalesTableComponent: FC = () => {
  const [sales, setSales] = useState<readonly Sale[]>([]);
  const [employees, setEmployees] = useState<readonly Employee[]>([]);
  const [buyers, setBuyers] = useState<readonly Buyer[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<readonly PaymentType[]>([]);
  const [products, setProducts] = useState<readonly Product[]>([]);
  const [removable, setRemovable] = useState<null | number>(null);
  const [editable, setEditable] = useState<EditableSale | null>(null);
  const [newSale, setNewSale] = useState<NewSale | null>(null);
  const [newSaleItem, setNewSaleItem] = useState<NewSaleItem>({
    ...defaultSaleItem,
  });
  const [isReportMode, setReportMode] = useState(false);

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

  const handleNew = (key: keyof NewSale, value: NewSale[typeof key]) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    newSale &&
      setNewSale({
        ...newSale,
        [key]: value,
      });
  };

  // eslint-disable-next-line promise/catch-or-return
  SaleService.get().then(setSales);

  // eslint-disable-next-line promise/catch-or-return
  if (employees.length === 0) EmployeeService.get().then(setEmployees);

  // eslint-disable-next-line promise/catch-or-return
  if (buyers.length === 0) BuyerService.get().then(setBuyers);

  // eslint-disable-next-line promise/catch-or-return
  if (paymentTypes.length === 0) PaymentTypeService.get().then(setPaymentTypes);

  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  if (products.length === 0) ProductService.get().then(setProducts);

  if (isReportMode) {
    return (
      <>
        <button
          type="button"
          className="linkStyledButton"
          onClick={() => setReportMode(false)}
        >
          Go to table view
        </button>
        <Report sales={sales} />
      </>
    );
  }

  return (
    <table className={isReportMode ? style.report : style.table}>
      <caption className={isReportMode ? style.reportTitle : style.caption}>
        Sales
        <button
          type="button"
          className={style.add}
          onClick={() =>
            setNewSale({
              buyer: buyers[0].id,
              employee: employees[0].id,
              paymentType: paymentTypes[0].id,
            })
          }
        >
          +
        </button>
        <button
          type="button"
          className="linkStyledButton"
          onClick={() => setReportMode(true)}
        >
          View as report
        </button>
      </caption>
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
            <tr
              className={isReportMode ? style.reportItem : style.row}
              key={id}
            >
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
                    setNewSaleItem({
                      ...newSaleItem,
                      sale: id,
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
              <div className={style.editField}>
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
              <div className={style.editField}>
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
                <span>Payment type</span>
                <select
                  value={editable.paymentType}
                  onChange={({ target: { value } }) =>
                    handleEdit('paymentType', Number(value))
                  }
                >
                  {paymentTypes.map((item) => (
                    <option value={item.id}>{item.name}</option>
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
              <div>
                <b className={style.miniTitle}>Sold goods</b>
                {sales
                  .find(({ id }) => id === editable.id)
                  ?.saleItems.map((item) => (
                    <div key={item.id} className={style.editField}>
                      <span>
                        {item.productName} ({item.count} pcs.)
                      </span>
                      <button
                        type="button"
                        className={`${style.delete} ${style.removeSaleItem}`}
                        onClick={() => {
                          SaleItemService.delete(item.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                <div>
                  <select
                    onChange={({ target: { value } }) =>
                      setNewSaleItem({
                        ...newSaleItem,
                        product: Number(value),
                      })
                    }
                  >
                    {products.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={newSaleItem.count}
                    onChange={({ target: { value } }) => {
                      setNewSaleItem({
                        ...newSaleItem,
                        count: Number(value),
                      });
                    }}
                  />
                  <button
                    type="button"
                    className={style.add}
                    onClick={() => {
                      SaleItemService.post(newSaleItem);
                    }}
                  >
                    Add
                  </button>
                </div>
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
        {newSale && (
          <Modal>
            <p className={style.modalTitle}>Add new sale</p>
            <div>
              <div className={style.editField}>
                <span>Employee</span>
                <select
                  value={newSale.employee}
                  onChange={({ target: { value } }) =>
                    handleNew('employee', Number(value))
                  }
                >
                  {employees?.map((item) => (
                    <option value={item.id}>
                      {item.firstName} {item.lastName} ({item.position})
                    </option>
                  ))}
                </select>
              </div>
              <div className={style.editField}>
                <span>Buyer</span>
                <select
                  value={newSale.buyer}
                  onChange={({ target: { value } }) =>
                    handleNew('buyer', Number(value))
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
                <span>Payment type</span>
                <select
                  value={newSale.paymentType}
                  onChange={({ target: { value } }) =>
                    handleNew('paymentType', Number(value))
                  }
                >
                  {paymentTypes.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={style.editActions}>
              <button
                type="button"
                className={style.edit}
                onClick={() => {
                  SaleService.post(newSale);
                  setNewSale(null);
                }}
              >
                Save
              </button>
              <button
                type="button"
                className={style.cancel}
                onClick={() => setNewSale(null)}
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
