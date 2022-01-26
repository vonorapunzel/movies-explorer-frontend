import "./SearchForm.css";
import find from "../../images/find.svg";

const SearchForm = () => {
  return(
    <section className="searchForm">
      <article className="searchForm__container">
        <div className="searchForm__inputSearch">
          <input className="searchForm__input" type="text" placeholder="Фильм" />
          <input className="searchForm__input-button" alt="кнопка поиска" type="image" src={find} />
        </div>
        <div className="searchForm__filter">
        <p className="searchForm__subtitle">Короткометражки</p>
        <label className="searchForm__switch">
          <input className="searchForm__checkbox" type="checkbox" />
          <span className="searchForm__slider"></span>
        </label>
        </div>
      </article>
    </section>
  )
};

export default SearchForm;
