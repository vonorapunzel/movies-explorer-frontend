import './Profile.css';

const Profile = () => {
  return(
    <div className="profile">
      <h2 className="profile__title">Привет, Иван!</h2>
      <form className="profile__form">
        <label className="profile__form-label">Имя
          <input className="profile__form-input" name="name" defaultValue="Иван" type="text" placeholder="Имя" />
        </label>
        <label className="profile__form-label">E-mail
          <input className="profile__form-input" name="email" defaultValue="Ivan@yandex.ru" type="email" placeholder="Имя" />
        </label>
        <button className="profile__form-submit">Редактировать</button>
      </form>
      <button className="profile__button-logout">Выйти из аккаунта</button>
    </div>
  );
};

export default Profile;