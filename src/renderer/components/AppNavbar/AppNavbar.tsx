import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

const AppNavbarComponent: FC = () => (
  <nav className={style.navbar}>
    <Link to="/products" className={style.navbar__link}>
      Products
    </Link>
    <Link to="/sales" className={style.navbar__link}>
      Sales
    </Link>
    <Link to="/employees" className={style.navbar__link}>
      Employees
    </Link>
    <Link to="/buyers" className={style.navbar__link}>
      Buyers
    </Link>
    <Link to="/" className={style.navbar__link}>
      Home
    </Link>
    <Link to="/other" className={style.navbar__link}>
      Other
    </Link>
  </nav>
);

export const AppNavbar = memo(AppNavbarComponent);
