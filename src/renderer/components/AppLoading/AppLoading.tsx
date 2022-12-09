import { FC, memo } from 'react';

import style from './style.module.css';

const AppLoadingComponent: FC = () => (
  <div className={style.loading}>Loading...</div>
);

export const AppLoading = memo(AppLoadingComponent);
