import { FC, memo, PropsWithChildren } from 'react';

import style from './style.module.css';

const ModalComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={style.back}>
      <div className={style.modal}>{children}</div>
    </div>
  );
};

export const Modal = memo(ModalComponent);
