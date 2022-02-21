import './ButtonMovies.css';

const ButtonMovies = ({ isAdded, onClick }) => {
  return (
    <>
      <button className={!isAdded ? 'button-movies' : 'button-movies-added'} type="button" onClick={onClick}>{!isAdded && 'Сохранить' }</button>
    </>
  );
}

export default ButtonMovies;