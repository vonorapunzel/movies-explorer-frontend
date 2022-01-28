import './ButtonDeleteMovie.css';

function ButtonDeleteMovie({ onClick }) {
  return (
    <button
      className='movies-card__button-delete'
      type="button"
      onClick={onClick}
    />
  );
}

export default ButtonDeleteMovie;