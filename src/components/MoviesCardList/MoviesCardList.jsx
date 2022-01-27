import { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import first from "../../images/1.jpg";
import ButtonMovies from "../ButtonMovies/ButtonMovies";
import ButtonDeleteMovie from "../ButtonDeleteMovie/ButtonDeleteMovie";

const MoviesCardList = ({ saved }) => {

  const [isAdded, setIsAdded] = useState(false);

  const handleButtonClick = () => {
    setIsAdded(!isAdded);
  }

  return(
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        <li className="movies-card-list__item">
          <MoviesCard img={first} title={"33 слова о дизайне"} time={"1ч 17м"}>
          { !saved 
            ? <ButtonMovies isAdded={isAdded} onClick={handleButtonClick}/> 
            : <ButtonDeleteMovie /> }
          </MoviesCard></li>
          <li className="movies-card-list__item">
          <MoviesCard img={first} title={"33 слова о дизайне"} time={"1ч 17м"}>
          { !saved 
            ? <ButtonMovies isAdded={isAdded} onClick={handleButtonClick}/> 
            : <ButtonDeleteMovie /> }
          </MoviesCard></li>
          <li className="movies-card-list__item">
          <MoviesCard img={first} title={"33 слова о дизайне"} time={"1ч 17м"}>
          { !saved 
            ? <ButtonMovies isAdded={isAdded} onClick={handleButtonClick}/> 
            : <ButtonDeleteMovie /> }
          </MoviesCard></li>
          <li className="movies-card-list__item">
          <MoviesCard img={first} title={"33 слова о дизайне"} time={"1ч 17м"}>
          { !saved 
            ? <ButtonMovies isAdded={isAdded} onClick={handleButtonClick}/> 
            : <ButtonDeleteMovie /> }
          </MoviesCard></li>
          <li className="movies-card-list__item">
          <MoviesCard img={first} title={"33 слова о дизайне"} time={"1ч 17м"}>
          { !saved 
            ? <ButtonMovies isAdded={isAdded} onClick={handleButtonClick}/> 
            : <ButtonDeleteMovie /> }
          </MoviesCard></li>
          <li className="movies-card-list__item">
          <MoviesCard img={first} title={"33 слова о дизайне"} time={"1ч 17м"}>
          { !saved 
            ? <ButtonMovies isAdded={isAdded} onClick={handleButtonClick}/> 
            : <ButtonDeleteMovie /> }
          </MoviesCard></li>
      </ul>
    </section>
  )
};

export default MoviesCardList;
