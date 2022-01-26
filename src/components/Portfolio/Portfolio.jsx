import "./Portfolio.css";
import link from "../../images/arrowLink.svg";

const Portfolio = () => {
  return(
    <section className="portfolio">
      <article className="portfolio__works">
        <h3 className="portfolio__works-title">Портфолио</h3>
        <a className="portfolio__works-link" href="https://github.com/vonorapunzel/how-to-learn" rel="noreferrer" target="_blank">
          <div className="portfolio__link-container portfolio__link-container_underline">
            <h3 className="portfolio__title-link">Статичный сайт</h3>
            <img className="portfolio__image-link" alt="стрелка" src={link}/>
          </div>
        </a>
        <a className="portfolio__works-link" href="https://github.com/vonorapunzel/russian-travel" rel="noreferrer" target="_blank">
          <div className="portfolio__link-container portfolio__link-container_underline">
            <h3 className="portfolio__title-link">Адаптивный сайт</h3>
            <img className="portfolio__image-link" alt="стрелка" src={link}/>
          </div>
        </a>
        <a className="portfolio__works-link" href="https://github.com/vonorapunzel/react-mesto-api-full" rel="noreferrer" target="_blank">
          <div className="portfolio__link-container">
            <h3 className="portfolio__title-link">Одностраничное приложение</h3>
            <img className="portfolio__image-link" alt="стрелка" src={link}/>
          </div>
          </a>
      </article>
    </section>
  )
};

export default Portfolio;
