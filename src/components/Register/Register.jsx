import "./Register.css";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";
import useFormWithValidation from "../../hooks/formValidation";

const Register = ({ signUpHandler, isSignError }) => {
  const formWithValidation = useFormWithValidation();
  const { handleChange, errors, values, isValid} = formWithValidation;
  const submitHandler = (e) => {
    e.preventDefault();
    signUpHandler(values.name, values.email, values.password);
  };

  return (
    <div className="entrance">
      <div className="entrance__head">
        <Link className="entrance-form__logo" to="/" ><img className="logo" src={logo} alt="Логотип" /></Link>
        <h2 className="entrance-form__title">Добро пожаловать!</h2>
      </div>
        <form className="entrance-form" autoComplete="off" onSubmit={submitHandler}>
          <label className="entrance-form__subtitle">Имя
            <input className={`entrance-form__input ${errors.name && 'entrance-form__input_has_error'} entrance-form__input_margin`} onChange={handleChange} value={ values.name || ''} required maxLength={30} minLength={2} name="name" placeholder="Имя" type="text"/>
            <span className="entrance-form__error">{errors.name}</span>
          </label>
          <label className="entrance-form__subtitle">E-mail
            <input className={`entrance-form__input ${errors.email && 'entrance-form__input_has_error'} entrance-form__input_margin`} onChange={handleChange} value={values.email || ''} required name="email" placeholder="Email" type="email"/>
            <span className="entrance-form__error">{errors.email}</span>
          </label>
          <label className="entrance-form__subtitle">Пароль
            <input className={`entrance-form__input ${errors.password && 'entrance-form__input_has_error'}`} name="password" onChange={handleChange} value={values.password || ''} required minLength={8} placeholder="Пароль" type="password"/>
            <span className="entrance-form__error">{errors.password}</span>
          </label>
          <button className={`entrance-form__button-submit ${ !isValid && 'entrance-form__button-submit_error'}`} type="submit"  disabled={!isValid && true}>Регистрация</button>
          {isSignError && <span className="entrance-form__error">Ошибка при регистрации</span>}
        </form> 
      <p className='entrance-form__question'>Уже зарегистрированы?<Link to='/signin' className="entrance-form__enter">Войти</Link></p>
    </div>
  );
};

export default Register;
