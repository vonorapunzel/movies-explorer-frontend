import "./Navigation.css";
import { Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Navigation = () => {
  return(
    <>
      <BurgerMenu />
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item"><Link to="/movies" className="header__link nav__link_active">Фильмы</Link></li>
          <li className="header__item"><Link to="/saved-movies" className="header__link header__link_margin_left">Сохраненные фильмы</Link></li>
        </ul>
      </nav>
      <Link className="header__button-link" to="/profile"><button className="header__button-account">Аккаунт</button></Link>
    
    </>
  )
}

export default Navigation;
