import "./Footer.css";

const Footer = () => {
  return(
    <footer className="footer">
      <div className="footer__container-title">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      </div>
      <div className="footer__container-bottom">
        <p className="footer__year">&#9400; 2022</p>
        <nav className="footer__nav">
          <ul className="footer__list">
            <a className="footer__link" href="https://practicum.yandex.ru/web/" rel="noreferrer" target="_blank"><li className="footer__item">Яндекс.Практикум</li></a>
            <a className="footer__link" href="https://github.com/vonorapunzel" rel="noreferrer" target="_blank"><li className="footer__item footer__item_margin">Github</li></a>
            <a className="footer__link" href="https://vk.com/idbullet47" rel="noreferrer" target="_blank"><li className="footer__item footer__item_margin">ВКонтакте</li></a>
          </ul>
        </nav>
      </div>
    </footer>
  )
};

export default Footer;
