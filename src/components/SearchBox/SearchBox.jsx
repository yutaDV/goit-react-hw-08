import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import {  selectFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter); // Отримуємо значення фільтру через селектор

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value)); // Змінюємо фільтр через Redux
  };

  return (
    <div className={css.searchBoxContainer}>
      <label className={css.searchLabel} htmlFor="search-input">
        Find contacts by name
      </label>
      <input
        id="search-input"
        className={css.searchBox}
        type="text"
        placeholder="Type a name..."
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;

