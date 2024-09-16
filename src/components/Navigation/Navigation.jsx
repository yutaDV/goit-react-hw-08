// src/components/Navigation.jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts">
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
