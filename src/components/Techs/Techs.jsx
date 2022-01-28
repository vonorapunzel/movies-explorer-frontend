import "./Techs.css";
import Title from "../Title/Title";

const Techs = () => {
  return(
    <section className="techs" id="techs-anchor">
      <Title title={"Технологии"}/>
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <nav className="techs__nav">
        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item techs__item_margin">CSS</li>
          <li className="techs__item techs__item_margin">JS</li>
          <li className="techs__item techs__item_margin">React</li>
          <li className="techs__item techs__item_margin">Git</li>
          <li className="techs__item techs__item_margin">Express.js</li>
          <li className="techs__item techs__item_margin">mongoDB</li>
        </ul>
      </nav>
    </section>
  )
};

export default Techs
