import { FC, memo } from 'react';
import { Modal } from '../Modal/Modal';

import style from './style.module.css';

interface Props {
  readonly title: string;

  readonly subtitle: string;

  onSubmit(): void;

  onReject(): void;
}

const ConfirmationDialogComponent: FC<Props> = ({
  onReject,
  onSubmit,
  subtitle,
  title,
}) => (
  <Modal>
    <div>
      <p>
        <b className={style.title}>{title}</b>
      </p>
      <p className={style.subtitle}>{subtitle}</p>
    </div>
    <div className={style.actions}>
      <button className={style.confirm} type="button" onClick={onSubmit}>
        Confirm
      </button>
      <button className={style.reject} type="button" onClick={onReject}>
        Cancel
      </button>
    </div>
  </Modal>
);

export const ConfirmationDialog = memo(ConfirmationDialogComponent);
