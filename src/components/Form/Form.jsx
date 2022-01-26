import "./Form.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

const Form = ({ title, name, inputName, entrance, question, link, subquestion }) => {
  return(
    <form className="entrance-form" autoComplete="off">
      <Link className="entrance-form__logo" to="/" ><img className="logo" src={logo} alt="Логотип" /></Link>
      <h2 className="entrance-form__title">{title}</h2>
      <p className={`entrance-form__subtitle ${name}`}>Имя</p>
      <input className={`entrance-form__input entrance-form__input_margin ${inputName}`} required maxLength={30} minLength={2} name="name" placeholder="Имя" type="text"/>
      <p className="entrance-form__subtitle">E-mail</p>
      <input className="entrance-form__input entrance-form__input_margin" required name="email" placeholder="Email" type="email"/>
      <p className="entrance-form__subtitle">Пароль</p>
      <input className="entrance-form__input" name="password"required minLength={8} placeholder="Пароль" type="password"/>
      <button className="entrance-form__button-submit" type="submit">{entrance}</button> 
      <p className={`entrance-form__question`}>{question}<Link to={link} className="entrance-form__enter"> {subquestion}</Link></p>
    </form>
  ); 
};

export default Form;
