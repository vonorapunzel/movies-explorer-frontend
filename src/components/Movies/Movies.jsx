import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMovies from "../MoreMovies/MoreMovies";

const Movies = ({ movies }) => {
  
  return(
    <>
      <SearchForm />
      <MoviesCardList movies={movies} />
      <MoreMovies />
    </>
  )
};

export default Movies;
