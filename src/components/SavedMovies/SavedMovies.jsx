import { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({ savedMovies, movies, isLoading, loadingError, checked, onSubmitSearch, filterBox, onActionClick, isMovieAdded }) => {

  const [moviesToRender, setMoviesToRender] = useState([]);

  useEffect(() => {
    setMoviesToRender(movies);
  }, [movies]);

  return(
    <>
      <SearchForm onFilterClick={onSubmitSearch} onSearch={onSubmitSearch} checked={checked} filterBox={filterBox} />
      {isLoading && <Preloader />}

      {!isLoading
      && loadingError === ''
      && (
      <MoviesCardList savedMovies={savedMovies}
          movies={moviesToRender}
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
