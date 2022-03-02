import './MoreMovies.css'

const MoreMovies = ({ onClick }) => {
  return(
    <div className="movies-card-list__load">
      <button className="movies-card-list__button" type="button" onClick={onClick}>Ещё</button>
    </div>
  );
};

export default MoreMovies
