import "./Header.css";
import { Switch, Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

const Header = ({ isLoggedIn }) => {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header_link-logo" to="/" ><img className="logo" src={logo} alt="Логотип" /></Link>
        <Switch>
          <Route path={["/", "/movies", "/saved-movies", "/profile"]}>
            { isLoggedIn && <Navigation /> }
            { !isLoggedIn && (<nav className="header__nav">
              <ul className="header__list">
                <li className="header__item"><Link to="/signup" className="header__link">Регистрация</Link></li>
                <li className="header__item"><Link to="/signin"><button className="header__link-button header__link-button_margin_left">Войти</button></Link></li> 
              </ul>
            </nav>)}
          </Route>
      </Switch>
      </div>
    </header>
  )
}

export default Header;
