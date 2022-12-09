import clsx from 'clsx';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

const AppNavbarComponent: FC = () => (
  <nav className={style.navbar}>
    <Link to="/products" className={clsx(style.navbar__link)}>
      Products
    </Link>
    <Link to="/sales" className={clsx(style.navbar__link)}>
      Sales
    </Link>
    <Link to="/" className={clsx(style.navbar__link)}>
      Home
    </Link>
  </nav>
);

export const AppNavbar = memo(AppNavbarComponent);
