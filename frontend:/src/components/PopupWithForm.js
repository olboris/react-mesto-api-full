import React from 'react';

function PopupWithForm(props) {

  const popupRef = React.useRef(null);
  const popupContainerRef = React.useRef(null);

  function handleOverlayClose(event) {

    if (popupRef.current && !popupContainerRef.current.contains(event.target)) {
      props.onClose();
    }
  }

  return (
    <div ref={popupRef} onSubmit={props.onSubmit} onClick={props.isOpen ? handleOverlayClose : undefined} className={`popup ${props.isOpen && 'popup_opened'}`} id={`${props.name}-popup`}>
      <div ref={popupContainerRef} className="popup__container" id={`${props.name}-form`}>
        <button onClick={props.onClose} type="button" aria-label="Закрыть" name="close-button" className="popup__close-button"></button>
        <form className="popup__form" name="form-element" id={`${props.name}-form-element`} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-button">{props.saveButton}</button>
        </form>
      </div>
    </div>

  );
}

export default PopupWithForm;