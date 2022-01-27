import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return(
    <>
      <SearchForm />
      <MoviesCardList saved={true}/>
    </>
  )
};

export default SavedMovies;
