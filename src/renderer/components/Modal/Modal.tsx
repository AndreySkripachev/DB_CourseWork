import { FC, memo, PropsWithChildren } from 'react';

import style from './style.module.css';

interface Props {
  readonly isOpen: boolean;
}

const ModalComponent: FC<PropsWithChildren<Props>> = ({ children, isOpen }) => {
  return isOpen ? (
    <div className={style.back}>
      <div className={style.modal}>{children}</div>
    </div>
  ) : null;
};

export const FormModal = memo(ModalComponent);
