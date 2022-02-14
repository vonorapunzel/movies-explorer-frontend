import "./SearchForm.css";
import { useState } from "react";
import find from "../../images/find.svg";

const SearchForm = ({ onSearch, onFilterClick }) => {
  const [searchText, setSearchText] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }

  return(
    <section className="searchForm">
      <form className="searchForm__container" onSubmit={handleSubmit}>
        <div className="searchForm__inputSearch">
          <input className="searchForm__input" value={searchText}
          onChange={handleChange} type="text" required placeholder="Фильм" />
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
