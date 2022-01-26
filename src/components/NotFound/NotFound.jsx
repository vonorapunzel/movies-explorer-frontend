import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__button" type="button">Назад</button>
    </div>
  );
};

export default NotFound;
