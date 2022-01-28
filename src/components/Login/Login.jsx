import "./Login.css";
import Form from '../Form/Form';

const Login = () => {
  return(
    <div className="entrance">
      <Form title={'Рады видеть!'} name={'entrance-form__subtitle_hidden'} inputName={'entrance-form__input_hidden'} entrance={'Войти'} question={'Ещё не зарегистрированы?'} link={'/signin'} subquestion={'Регистрация'}/>
    </div>
  );
};

export default Login;
