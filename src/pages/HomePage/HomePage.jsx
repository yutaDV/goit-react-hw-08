import css from './HomePage.module.css';
import { FaPhone } from 'react-icons/fa'; 

const HomePage = () => {
  return (
    <div className={css.container}>
      <FaPhone className={css.icon} />
      <h1 className={css.title}>Welcome to the Phonebook App</h1>
    </div>
  );
};

export default HomePage;

