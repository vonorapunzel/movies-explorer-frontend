import './BurgerMenu.css';
import { Link } from 'react-router-dom';

const BurgerMenu = () => {
  return(
    <div className="header__burger-menu">
      <input className="header__menu-toogle" id="menu-toggle" type="checkbox" />
      <label className="header__menu-btn" htmlFor="menu-toggle">
        <span></span>
      </label>
      <ul className="header__menubox">
        <li className='header__menu-item'><Link className="header__menu-link" to="/">Главная</Link></li>
        <li className='header__menu-item'><Link className="header__menu-link" to="/movies">Фильмы</Link></li>
        <li className='header__menu-item'><Link className="header__menu-link" to="/saved-movies">Сохраненные фильмы</Link></li>
        <li className='header__menu-item'><Link className="header__menu-link header__menu-link_notborder" to="/profile"><button className="header__button-account">Аккаунт</button></Link></li>
      </ul>
    </div>
  )
}

export default BurgerMenu;
