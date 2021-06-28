import React from 'react';
import { useHistory } from 'react-router-dom';

function Register(props) {
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const history = useHistory();

  function handleChangeEmail(e) {
    setInputEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setInputPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(inputEmail, inputPassword)
    setInputEmail('');
    setInputPassword('');
  }

  function handleClick(e) {
    history.push('/sign-in');
  }

  return (
    <div className="popup__container popup__container_place_enter">
      <form className="popup__form popup__form_place_enter" onSubmit={handleSubmit} name="form-element">
        <h2 className="popup__title popup__title_place_enter">Регистрация</h2>
        <input name="email" type="email" placeholder="Email" value={inputEmail} onChange={handleChangeEmail} className="popup__input popup__input_place_enter" />
        <input name="password" type="password" placeholder="Пароль" value={inputPassword} onChange={handleChangePassword} className="popup__input popup__input_place_enter" />
        <button type="submit" className="popup__save-button popup__save-button_place_enter">Зарегистрироваться</button>
        <button className="popup__login-button" onClick={handleClick}>Уже зарегистрированы? Войти</button>
      </form>
    </div>
  );
}

export default Register;