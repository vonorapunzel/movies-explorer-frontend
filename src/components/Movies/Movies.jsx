import { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = ({ movies, onSubmitSearch, onActionClick, isMovieAdded }) => {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShortFilm = (moviesToFilter) => moviesToFilter.filter((item) => item.duration < 40);

  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };


  return(
    <>
      <SearchForm onFilterClick={onFilterClick} onSearch={onSubmitSearch} />
      <MoviesCardList movies={filterIsOn ? filterShortFilm(movies) : movies} onActionClick={onActionClick} isMovieAdded={isMovieAdded}/>
    </>
  )
};

export default Movies;
