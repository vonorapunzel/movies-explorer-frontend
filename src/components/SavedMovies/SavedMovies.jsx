import { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = ({ savedMovies, movies, onActionClick, isMovieAdded }) => {
  const [filterIsOn, setFilterIsOn] = useState(false);

  const filterShortFilm = (moviesToFilter) => moviesToFilter.filter((item) => item.duration < 40);
  
  const onFilterClick = () => {
    setFilterIsOn(!filterIsOn);
  };

  const [moviesToRender, setMoviesToRender] = useState([]);

  useEffect(() => {
    setMoviesToRender(movies);
  }, [movies]);

  const searchFilter = (data, searchQuery) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      return data.filter((item) => regex.test(item.nameRU) || regex.test(item.nameEN));
    }
    return [];
  };

  const searchInSavedHandler = (searchQuery) => {
    setMoviesToRender(searchFilter(movies, searchQuery));
  };
  return(
    <>
      <SearchForm onFilterClick={onFilterClick} onSearch={searchInSavedHandler} />
      <MoviesCardList savedMovies={savedMovies}
          movies={filterIsOn ? filterShortFilm(moviesToRender) : moviesToRender}
          onActionClick={onActionClick}
          isMovieAdded={isMovieAdded} />
    </>
  )
};

export default SavedMovies;
