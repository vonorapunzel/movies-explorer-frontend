import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMovies from "../MoreMovies/MoreMovies";

const Movies = () => {
  return(
    <>
      <SearchForm />
      <MoviesCardList />
      <MoreMovies />
    </>
  )
};

export default Movies;
