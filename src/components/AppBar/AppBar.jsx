import css from './AppBar.module.css';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';

import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../Menu/Menu';
import clsx from 'clsx';

const AppBar = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <nav className={clsx(isLoggedIn ? css.container : css.nav)}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </nav>
  );
};

export default AppBar;