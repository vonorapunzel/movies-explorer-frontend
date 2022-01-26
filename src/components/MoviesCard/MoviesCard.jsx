import "./MoviesCard.css";

const MoviesCard = ({ type, button, img, title, time }) => {
  return(
    <div className="movies-card">
      <button className={type}>{button}</button>
      <img className="movies-card__img" alt="постер" src={img}/>
      <div className="movies-card__container">
        <h3 className="movies-card__title">{title}</h3>
        <div className="movies-card__container-time">
          <p className="movies-card__time">{time}</p>
        </div>
      </div>
    </div>
  )
};

export default MoviesCard;
