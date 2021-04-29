import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(' ');
  const [description, setDescription] = React.useState(' ');

  React.useEffect(() => {
    setName(String(currentUser.name));
    setDescription(String(currentUser.about));
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="edit" title="Редактировать профиль" saveButton="Cохранить" children={
      <>
        <input onChange={handleChangeName} value={name} type="text" minLength="2" maxLength="40" required name="input-name" placeholder="Имя и Фамилия" id="input-name" className="popup__input" />
        <span id="input-name-error" className="popup__input-error"></span>
        <input onChange={handleChangeDescription} value={description} type="text" minLength="2" maxLength="200" required name="input-specialty" placeholder="Род деятельности" id="input-specialty" className="popup__input" />
        <span id="input-specialty-error" className="popup__input-error"></span>
      </>}
    />
  );
}

export default EditProfilePopup;