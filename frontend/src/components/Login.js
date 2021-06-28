import React from 'react';

function Login(props) {
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');

  function handleChangeEmail(e) {
    setInputEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setInputPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(inputEmail, inputPassword)
    setInputEmail('');
    setInputPassword('');
  }

  return (
    <div className=" popup__container popup__container_place_enter">
      <form className="popup__form popup__form_place_enter" onSubmit={handleSubmit} name="form-element">
        <h2 className="popup__title popup__title_place_enter">Вход</h2>
        <input name="email" type="email" placeholder="Email" value={inputEmail} onChange={handleChangeEmail} className="popup_input popup__input_place_enter" />
        <input name="password" type="password" placeholder="Пароль" value={inputPassword} onChange={handleChangePassword} className="popup__input_place_enter" />
        <button type="submit" className="popup__save-button popup__save-button_place_enter">Войти</button>
      </form>
    </div>
  );
}

export default Login;