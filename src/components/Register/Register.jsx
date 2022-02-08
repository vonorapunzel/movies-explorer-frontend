import "./Register.css";
import { useState } from "react";
import logo from '../../images/logo.svg';
import { Link } from "react-router-dom";


const Register = ({ signUpHandler }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    signUpHandler(name, email, password);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="entrance">
      <div className="entrance__head">
        <Link className="entrance-form__logo" to="/" ><img className="logo" src={logo} alt="Логотип" /></Link>
        <h2 className="entrance-form__title">Добро пожаловать!</h2>
      </div>
        <form className="entrance-form" autoComplete="off" onSubmit={submitHandler}>
          <label className="entrance-form__subtitle">Имя
            <input className='entrance-form__input entrance-form__input_margin' onChange={handleChangeName} value={ name} required maxLength={30} minLength={2} name="name" placeholder="Имя" type="text"/>
          </label>
          <label className="entrance-form__subtitle">E-mail
            <input className="entrance-form__input entrance-form__input_margin" onChange={handleChangeEmail} value={email} required name="email" placeholder="Email" type="email"/>
          </label>
          <label className="entrance-form__subtitle">Пароль
            <input className="entrance-form__input" name="password" onChange={handleChangePassword} value={password} required minLength={8} placeholder="Пароль" type="password"/>
          </label>
          <button className="entrance-form__button-submit" type="submit">Регистрация</button>
        </form> 
      <p className='entrance-form__question'>Уже зарегистрированы?<Link to='/signin' className="entrance-form__enter">Войти</Link></p>
    </div>
  );
};

export default Register;
