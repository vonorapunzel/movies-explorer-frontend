import { useState } from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
import logo from '../../images/logo.svg'

const Login = ({ signInHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    signInHandler(email, password);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }


  return(
    <div className="entrance">
      <div className="entrance__head">
        <Link className="entrance-form__logo" to="/" ><img className="logo" src={logo} alt="Логотип" /></Link>
        <h2 className="entrance-form__title">Рады видеть!</h2>
      </div>
      <form className="entrance-form" autoComplete="off" onSubmit={submitHandler}>
        <label className="entrance-form__subtitle">E-mail
          <input className="entrance-form__input entrance-form__input_margin" onChange={handleChangeEmail} value={email} required name="email" placeholder="Email" type="email"/>
        </label>
        <label className="entrance-form__subtitle">Пароль
          <input className="entrance-form__input" name="password" onChange={handleChangePassword} value={password} required minLength={8} placeholder="Пароль" type="password"/>
        </label>
        <button className="entrance-form__button-submit" type="submit">Войти</button>
      </form>
      <p className='entrance-form__question'>Еще не зарегистрированы?<Link to='/signup' className="entrance-form__enter">Регистрация</Link></p>
    </div>
  );
};

export default Login;
