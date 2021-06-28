import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="avatar" title="Обновить аватар" saveButton="Cохранить" children={
      <>
        <input ref={avatarRef} type="url" name="input-avatar" required id="input-avatar" placeholder="Ссылка на аватар" className="popup__input" />
        <span id="input-avatar-error" className="popup__input-error"></span>
      </>
    } />
  );
}

export default EditAvatarPopup;