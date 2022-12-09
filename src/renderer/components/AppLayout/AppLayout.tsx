import { FC, memo, PropsWithChildren } from 'react';

import style from './style.module.css';

const AppLayoutComponent: FC<PropsWithChildren> = ({ children }) => (
  <div className={style.layout}>{children}</div>
);

export const AppLayout = memo(AppLayoutComponent);
