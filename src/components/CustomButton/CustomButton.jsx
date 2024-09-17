
import css from './CustomButton.module.css';

const CustomButton = ({ children, onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
