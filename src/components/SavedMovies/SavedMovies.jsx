import { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({ savedMovies, movies, isLoading, loadingError, checked, onSubmitSearch, filterBox, onActionClick, isMovieAdded }) => {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShortFilm = (moviesToFilter) => moviesToFilter.filter((item) => item.duration < 40);
  
  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };

  const [moviesToRender, setMoviesToRender] = useState([]);

  useEffect(() => {
    setMoviesToRender(movies);
  }, [movies]);

  return(
    <>
      <SearchForm onFilterClick={onFilterClick} onSearch={onSubmitSearch} checked={checked} filterBox={filterBox} />
      {isLoading && <Preloader />}

      {!isLoading
      && loadingError === ''
      && (
      <MoviesCardList savedMovies={savedMovies}
          movies={filterIsOn ? filterShortFilm(moviesToRender) : moviesToRender}
          onActionClick={onActionClick}
          isMovieAdded={isMovieAdded} />
      )}

      {
        !isLoading
        && loadingError !== ''
        && <div className="movies__error">{loadingError}</div>
      }
    </>
  )
};

export default SavedMovies;
