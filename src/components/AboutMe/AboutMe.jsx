import "./AboutMe.css"
import Title from "../Title/Title";
import me from "../../images/me.jpg";

const AboutMe = () => {
  return(
    <section className="aboutMe" id="aboutMe-anchor">
      <Title title={"Студент"} />
      <article
      className="aboutMe__container">
        <div className="aboutMe__biograph">
          <h2 className="aboutMe__title">Иван</h2>
          <p className="aboutMe__subtitle">Web-разработчик, 27 лет.</p>
          <p className="aboutMe__description">Я родился Боровске, живу в Москве, закончил факультет ИУ МГТУ им. Баумана. У меня есть жена. Я люблю слушать музыку, а ещё увлекаюсь играми. Недавно начал кодить. С 2018 года работал в компании «ЦНИРТИ им. академика А.И. Берга.</p>
          <a className="aboutMe__link" href="https://vk.com/idbullet47" rel="noreferrer" target="_blank">ВКонтакте</a>
          <a className="aboutMe__link" href="https://github.com/vonorapunzel" rel="noreferrer" target="_blank">Github</a>
        </div>
        <img className="aboutMe__image" alt="фото студента" src={me}/>
      </article>
    </section>
  )
};

export default AboutMe;
