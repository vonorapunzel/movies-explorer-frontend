import './ButtonMovies.css';
import saved from '../../images/saved.svg';

const ButtonMovies = ({ isAdded, onClick }) => {
  return (
    <>
      { !isAdded
        ? <button className='button-movies' type="button" onClick={onClick}>Сохранить</button>
        : <img className="movies-card-saved" alt="сохранено" src={saved} /> }
    </>
  );
}

export default ButtonMovies;