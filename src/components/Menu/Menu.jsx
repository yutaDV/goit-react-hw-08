import css from './Menu.module.css';
import { IoLogOutOutline } from 'react-icons/io5';
import { logout } from '../../redux/auth/operations';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../redux/auth/selectors';

const Menu = () => {
  const user = useSelector(selectAuthUser);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success('Logout was successful', {
          style: {
            border: '1px solid rgb(0, 106, 255)',
            padding: '16px',
            color: 'rgb(0, 106, 255)',
          },
          iconTheme: {
            primary: 'rgb(0, 226, 45)',
            secondary: '#FFFAEE',
          },
        });
      });
  };

  return (
    <>
      <p className={css.welcomeText}>Hello, {user.name}</p>
      <button type="button" onClick={onLogout} className={css.logoutBtn}>
        Logout
        <IoLogOutOutline className={css.logoutIcon} />
      </button>
    </>
  );
};

export default Menu;