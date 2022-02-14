import './Profile.css';
import { useEffect, useContext, useState } from 'react';
import CurrentUserContext from '../../Context/CurrentUserContext';

const Profile = ({ onSignOut, onUpdate }) => {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(email, name);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return(
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name} !</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__form-label">Имя
          <input className="profile__form-input" required minLength="2" 
            maxLength="30" name="name" autoComplete="off" value={currentUser.name} onChange={handleChangeName} type="text" placeholder="Имя" />
        </label>
        <label className="profile__form-label">E-mail
          <input className="profile__form-input" autoComplete="off" required name="email" onChange={handleChangeEmail} value={email} type="email" placeholder="E-mail" />
        </label>
        <button className="profile__form-submit" type="submit">Редактировать</button>
      </form>
      <button className="profile__button-logout" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
    </div>
  );
};

export default Profile;