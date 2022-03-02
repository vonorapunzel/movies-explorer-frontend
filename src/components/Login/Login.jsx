import { Link } from "react-router-dom";
import "./Login.css";
import logo from '../../images/logo.svg'
import useFormWithValidation from '../../hooks/formValidation';

const Login = ({ signInHandler, isSignErrorLogin }) => {
  const formWithValidation = useFormWithValidation();
  const { handleChange, errors, values, isValid} = formWithValidation;
  const submitHandler = (e) => {
    e.preventDefault();
    signInHandler(values.email, values.password);
  };

  


  return(
    <div className="entrance">
      <div className="entrance__head">
        <Link className="entrance-form__logo" to="/" ><img className="logo" src={logo} alt="Логотип" /></Link>
        <h2 className="entrance-form__title">Рады видеть!</h2>
      </div>
      <form className="entrance-form" autoComplete="off" onSubmit={submitHandler}>
        <label className="entrance-form__subtitle">E-mail
          <input className="entrance-form__input entrance-form__input_margin" onChange={handleChange} value={values.email || ''} required name="email" placeholder="Email" type="email"/>
          <span className="entrance-form__error">{errors.email}</span>
        </label>
        <label className="entrance-form__subtitle">Пароль
          <input className="entrance-form__input" name="password" onChange={handleChange} value={values.password || ''} required minLength={8} placeholder="Пароль" type="password"/>
          <span className="entrance-form__error">{errors.password}</span>
        </label>
        <button className={`entrance-form__button-submit ${ !isValid && 'entrance-form__button-submit_error'}`} type="submit" disabled={!isValid && true}>Войти</button>
        {isSignErrorLogin && <span className="entrance-form__error">Не правильные почта или пароль</span>}
      </form>
      <p className='entrance-form__question'>Еще не зарегистрированы?<Link to='/signup' className="entrance-form__enter">Регистрация</Link></p>
    </div>
  );
};

export default Login;
