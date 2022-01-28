import "./NavTab.css";

const NavTab = () => {
  return(
    <nav className="nav">
      <ul className="promo__list">
        <li className="promo__item">
          <a href="/#aboutProject-anchor" className="promo__link"><button className="promo__link-button-navtab">О проекте</button></a>
        </li>
        <li className="promo__item">
          <a href="/#techs-anchor" className="promo__link promo__link_margin"><button className="promo__link-button-navtab">Технологии</button></a>
        </li>
        <li className="promo__item">
          <a href="/#aboutMe-anchor" className="promo__link promo__link_margin"><button className="promo__link-button-navtab">Студент</button></a>
        </li>
      </ul>
    </nav>
  )
};

export default NavTab;
