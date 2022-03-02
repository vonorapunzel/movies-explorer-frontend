import "./MoviesCard.css";
import ButtonMovies from '../ButtonMovies/ButtonMovies';
import ButtonDeleteMovie from "../ButtonDeleteMovie/ButtonDeleteMovie";
import durationFormatter from '../Duration/Duration';

const MoviesCard = ({ savedMovies, movie, onActionClick, isMovieAdded }) => {
  
  const {
    nameRU, duration, trailer, image, 
  } = movie;
  
  const isAdded = isMovieAdded(movie);

  const handleLikeMovie = (e) => {
    onActionClick(movie, !isAdded);
  }

  const handleDeleteMovie = () => {
    onActionClick(movie, false);
  } 

  return(
      <div className="movies-card">
        {savedMovies
          ? <ButtonDeleteMovie onClick={handleDeleteMovie} />
          : <ButtonMovies onClick={handleLikeMovie} isAdded={isAdded} />}
          <a className="movie-card__link" href={trailer} target="_blank" rel="noopener noreferrer">
        <img className="movies-card__img" alt="постер" src={image}/>
        </a>
        <div className="movies-card__container">
          <h3 className="movies-card__title">{nameRU}</h3>
          <div className="movies-card__container-time">
            <p className="movies-card__time">{durationFormatter(duration)}</p>
          </div>
        </div>
      </div>
  )
};

export default MoviesCard;
