import "./SearchForm.css";
import { useState, useEffect } from "react";
import find from "../../images/find.svg";
import useFormWithValidation from '../../hooks/formValidation';

const SearchForm = ({ onSearch, onFilterClick, isLoading }) => {
  const formWithValidation = useFormWithValidation();
  const { searchText } = formWithValidation.values;
  const { handleChange, resetForm } = formWithValidation;
  const [error, setError] = useState('');

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText) {
      setError('Нужно ввести ключевое слово');
      setTimeout(() => {
        setError('');
      }, 2000);
    } else {
      onSearch(searchText);
      resetForm();
    }
  };


  return(
    <section className="searchForm">
      <form className="searchForm__container" onSubmit={handleSubmit}>
        <div className="searchForm__inputSearch">
          <input className="searchForm__input" name="searchText"
          type="text"
          placeholder="Фильм"
          required
          value={searchText || ''}
          onChange={handleChange}
          autoComplete="off"
          disabled={isLoading} />
          {error && <span className="search-form__error">{error}</span>}
          <input className="searchForm__input-button" alt="кнопка поиска" type="image" src={find} />
        </div>
        <div className="searchForm__filter">
        <p className="searchForm__subtitle">Короткометражки</p>
        <label className="searchForm__switch">
          <input className="searchForm__checkbox" type="checkbox" onClick={onFilterClick} />
          <span className="searchForm__slider"></span>
        </label>
        </div>
      </form>
    </section>
  )
};

export default SearchForm;
