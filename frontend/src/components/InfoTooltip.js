import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip (props) {
  const popupRef = React.useRef(null);
  const popupContainerRef = React.useRef(null);

  function handleOverlayClose(event) {
    if (popupRef.current && !popupContainerRef.current.contains(event.target)) {
      props.onClose();
    }
  }

  return (
    <div ref={popupRef} onClick={props.isOpen ? handleOverlayClose : undefined} className={`popup ${props.isOpen && 'popup_opened'}`} id="info-popup">
      <div ref={popupContainerRef} className="popup__container">
      <button onClick={props.onClose} type="button" aria-label="Закрыть" name="imageclose-button" id="imageclose-button" className="popup__close-button"></button>
      <figure className="popup__info-figure">
          <img className="popup__info-image" alt="Картинка" src={`${props.isSuccess ? success : fail}`} />
          <figcaption className="popup__info-message">{`${props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз!"}`}</figcaption>
        </figure>
      </div>
    </div>

  );
}

export default InfoTooltip;