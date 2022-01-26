import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import first from "../../images/1.jpg";

const MoviesCardList = () => {
  return(
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_save"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_saved"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_saved"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
        <li className="movies-card-list__item"><MoviesCard type={"movies-card__button_hidden"} button={"сохранить"} img={first} title={"33 слова о дизайне"} time={"1ч 17м"}/></li>
      </ul>
      <div className="movies-card-list__load">
        <button className="movies-card-list__button" type="button">Ещё</button>
      </div>
    </section>
  )
};

export default MoviesCardList;
