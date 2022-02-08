import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import first from "../../images/1.jpg";

const MoviesCardList = ({ movies }) => {

  return(
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} img={first}/>
        ))}
      </ul>
    </section>
  )
};

export default MoviesCardList;
