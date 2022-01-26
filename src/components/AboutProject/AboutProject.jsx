import "./AboutProject.css";
import Title from "../Title/Title";

const AboutProject = () => {
  return(
    <section className="aboutProject" id="aboutProject-anchor">
      <Title title={"О проекте"} />
      <ul className="aboutProject__list">
        <li className="aboutProject__item">
          <h3 className="aboutProject__item-title">Дипломный проект включал 5 этапов</h3><p className="aboutProject__item-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="aboutProject__item">
          <h3 className="aboutProject__item-title">На выполнение диплома ушло 5 недель</h3><p className="aboutProject__item-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="aboutProject__progressBar">
        <div className="aboutProject__container-firstWeek">
          <p className="aboutProject__progressBar-title">1 неделя</p>
        </div>
        <div className="aboutProject__container-fourWeek">
          <p className="aboutProject__progressBar-title aboutProject__progressBar-title_color_white">4 недели</p>
        </div>
        <p className="aboutProject__mark">Back-end</p>
        <p className="aboutProject__mark">Front-end</p>
      </div>
    </section>
  )
};

export default AboutProject;
