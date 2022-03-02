import { useState } from "react";
import "./Form.css";

const Form = ({ FormTypeLogin, signUpHandler }) => {
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

  return(
    <form className="entrance-form" autoComplete="off" onSubmit={submitHandler}>
      {!FormTypeLogin && (
      <label className="entrance-form__subtitle">Имя
        <input className='entrance-form__input entrance-form__input_margin' onChange={handleChangeName} value={name} required maxLength={30} minLength={2} name="name" placeholder="Имя" type="text"/>
      </label>
      )}
      <label className="entrance-form__subtitle">E-mail
        <input className="entrance-form__input entrance-form__input_margin" onChange={handleChangeEmail} value={email} required name="email" placeholder="Email" type="email"/>
      </label>
      <label className="entrance-form__subtitle">Пароль
        <input className="entrance-form__input" name="password" onChange={handleChangePassword} value={password} required minLength={8} placeholder="Пароль" type="password"/>
      </label>
      <button className="entrance-form__button-submit" type="submit">Регистрация</button>
    </form>
  ); 
};

export default Form;
