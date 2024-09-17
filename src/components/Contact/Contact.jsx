import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import css from './Contact.module.css';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contact}>
      <div className={css.infoContainer}>
        <p className={css.nameContact}><PersonIcon className={css.icon} /> {name}</p>
        <p className={css.numberContact}><PhoneIcon className={css.icon} /> {number}</p>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.button} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Contact;
