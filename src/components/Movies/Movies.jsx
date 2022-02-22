import { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

const Movies = ({ savedMovies, movies, onSubmitSearch, isLoading, checked, filterBox, loadingError, onActionClick, isMovieAdded }) => {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };


  return(
    <>
      <SearchForm onFilterClick={onFilterClick} onSearch={onSubmitSearch} checked={checked} filterBox={filterBox} isLoading={isLoading}/>
      {isLoading && <Preloader />}

      {!isLoading && loadingError === '' && (
      <MoviesCardList savedMovies={savedMovies} movies={movies} onActionClick={onActionClick} isMovieAdded={isMovieAdded}/>
      )}
      {
        !isLoading
        && loadingError !== ''
        && <div className="movies__error">{loadingError}</div>
      }
    </>
  )
};

export default Movies;
