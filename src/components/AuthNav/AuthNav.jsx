import css from './AuthNav.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const AuthNav = () => {
  return (
    <>
      <div className={css.linksContainer}>
        <NavLink
          to="/register"
          className={({ isActive }) => {
            return clsx(css.link, isActive && css.active);
          }}
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => {
            return clsx(css.link, isActive && css.active);
          }}
        >
          Log In
        </NavLink>
      </div>
    </>
  );
};

export default AuthNav;