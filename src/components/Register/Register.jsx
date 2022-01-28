import "./Register.css";
import Form from "../Form/Form";

const Register = () => {
  return (
    <div className="entrance">
      <Form  title={'Добро пожаловать!'} entrance={'Регистрация'} question={'Уже зарегистрированы?'} link={'/signup'} subquestion={'Войти'}/>
    </div>
  );
};

export default Register;
