import './Profile.css';
import { useEffect, useContext } from 'react';
import useFormWithValidation from '../../hooks/formValidation';
import CurrentUserContext from '../../Context/CurrentUserContext';

const Profile = ({ onSignOut, onUpdate, editIsSuccess, editIsFailed }) => {
  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setIsValid,
  } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(values);
  };

  return(
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name} !</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__form-label" htmlFor="name">Имя
          <input className="profile__form-input"
            id="name"
            required
            minLength="2"
            maxLength="30"
            name="name"
            type="text"
            placeholder="Имя"
            value={values.name || ''}
            onChange={handleChange}
            autoComplete="off" />
        <span className="profile__form-error">{errors.name}</span>
        </label>
        <label className="profile__form-label" htmlFor="email">E-mail
          <input className="profile__form-input" id="email"
            required
            name="email"
            type="email"
            placeholder="Почта"
            value={values.email || ''}
            onChange={handleChange}
            autoComplete="off" />
          <span className="profile__form-error">{errors.email}</span>
        </label>
        {editIsSuccess && <p className="profile__form-sbmt-success">Данные успешно изменены!</p>}
        {editIsFailed && <p className="profile__form-sbmt-failed">Ошибка при изменении данных</p>}

        <button
          type="submit"
          className={(isValid && (values.name !== currentUser.name
            || values.email !== currentUser.email))
            ? 'profile__form-submit profile__form-submit_is-active'
            : 'profile__form-submit'}
          disabled={(values.name === currentUser.name
            && values.email === currentUser.email) || !isValid}
        >
          Редактировать
        </button>
      </form>
      <button className="profile__button-logout" type="button" onClick={onSignOut}>Выйти из аккаунта</button>
    </div>
  );
};

export default Profile;