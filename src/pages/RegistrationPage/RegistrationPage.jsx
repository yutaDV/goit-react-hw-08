
import css from './RegistrationPage.module.css';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
  return (
    <div className={css.pageContainer}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;