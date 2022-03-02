import { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import first from "../../images/1.jpg";
import MoreMovies from "../MoreMovies/MoreMovies";

const MoviesCardList = ({ savedMovies, movies, onActionClick, isMovieAdded }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [extraRow, setExtraRow] = useState(3);
  const [moviesToRender, setMoviesToRender] = useState([]);

  const getCount = (windowSize) => {
    if (windowSize >= 1280) {
      return { first: 12, extra: 3 };
    } if (windowSize > 480 && windowSize <= 768) {
      return { first: 8, extra: 2 };
    }
    return { first: 5, extra: 2 };
  };

  const renderExtraRow = () => {
    const count = Math.min(movies.length, currentCount + extraRow);
    const extraMovies = movies.slice(currentCount, count);
    setMoviesToRender([...moviesToRender, ...extraMovies]);
    setCurrentCount(count);
  };

  const resizeHandler = () => {
    const windowSize = window.innerWidth;
    setExtraRow(getCount(windowSize));
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setExtraRow(getCount(windowSize).extra);
    const count = Math.min(movies.length, getCount(windowSize).first);
    setMoviesToRender(movies.slice(0, count));
    setCurrentCount(count);
  }, [movies]);

  const renderMore = () => renderExtraRow();
  return(
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {moviesToRender.map((movie) => (
          <li className="movies-card-list__item" key={movie.id}>
            <MoviesCard movie={movie} savedMovies={savedMovies} onActionClick={onActionClick} isMovieAdded={isMovieAdded} img={first}/>
          </li>
        ))}
      </ul>
      { currentCount <movies.length && <MoreMovies onClick={renderMore} /> }
    </section>
  )
};

export default MoviesCardList;
