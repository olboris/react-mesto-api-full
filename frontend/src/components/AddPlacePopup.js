import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: place,
      link,
    });
    setLink('');
    setPlace('');
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="add" title="Новое место" saveButton="Cоздать" children={
      <>
        <input onChange={handleChangePlace} value={place} type="text" name="input-place" minLength="1" maxLength="30" required id="input-place" placeholder="Название" className="popup__input" />
        <span id="input-place-error" className="popup__input-error"></span>
        <input onChange={handleChangeLink} value={link} type="url" name="input-link" required id="input-link" placeholder="Ссылка на картинку" className="popup__input" />
        <span id="input-link-error" className="popup__input-error"></span>
      </>
    } />
  );
}

export default AddPlacePopup;