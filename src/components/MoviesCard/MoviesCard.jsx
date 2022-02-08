import { useState } from "react";
import { useLocation } from "react-router-dom"; 
import "./MoviesCard.css";
import ButtonMovies from '../ButtonMovies/ButtonMovies';
import ButtonDeleteMovie from "../ButtonDeleteMovie/ButtonDeleteMovie";
import durationFormatter from '../Duration/Duration';

const MoviesCard = ({ movie }) => {
  const location = useLocation();
  const [isAdded, setIsAdded] = useState(false);

  const handleLikeMovie = () => {
    setIsAdded(true);
  }

  const handleDeleteMovie = () => {

  } 

  return(
    <li className="movies-card-list__item">
      <div className="movies-card">
        {location.pathname === '/movies'
          ? <ButtonMovies onClick={handleLikeMovie} isAdded={isAdded}/>
          : <ButtonDeleteMovie onClick={handleDeleteMovie}/>}
        <img className="movies-card__img" alt="постер" src={`https://api.nomoreparties.co/${movie.image.url}`}/>
        <div className="movies-card__container">
          <h3 className="movies-card__title">{movie.nameRU}</h3>
          <div className="movies-card__container-time">
            <p className="movies-card__time">{durationFormatter(movie.duration)}</p>
          </div>
        </div>
      </div>
    </li>
  )
};

export default MoviesCard;
