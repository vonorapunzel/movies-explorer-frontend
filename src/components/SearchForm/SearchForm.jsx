import "./SearchForm.css";
import { useState, useEffect } from "react";
import find from "../../images/find.svg";

const SearchForm = ({ onSearch, onFilterClick, filterBox, checked, isLoading }) => {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
    localStorage.setItem('searchText', searchText);
  };

  const enterWord = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const text = localStorage.getItem('searchText');
    if(text) setSearchText(text);
  }, []);


  return(
    <section className="searchForm">
      <form className="searchForm__container" onSubmit={handleSubmit}>
        <div className="searchForm__inputSearch">
          <input className="searchForm__input" name="searchText"
          type="text"
          placeholder="Фильм"
          value={searchText}
          onChange={enterWord}
          autoComplete="off"
          disabled={isLoading} />
          <input className="searchForm__input-button" alt="кнопка поиска" type="image" src={find} />
        </div>
        <div className="searchForm__filter">
        <p className="searchForm__subtitle">Короткометражки</p>
        <label className="searchForm__switch">
          <input className="searchForm__checkbox" type="checkbox" onClick={onFilterClick} onChange={filterBox} checked={checked} />
          <span className="searchForm__slider"></span>
        </label>
        </div>
      </form>
    </section>
  )
};

export default SearchForm;
