import React from 'react';

function ImagePopup(props) {

  const popupRef = React.useRef(null);
  const popupContainerRef = React.useRef(null);

  function handleOverlayClose(event) {

    if (popupRef.current && !popupContainerRef.current.contains(event.target)) {
      props.onClose();
    }
  }

  return (
    <div ref={popupRef} onClick={props.isOpen ? handleOverlayClose : undefined} className={`popup ${props.isOpen && 'popup_opened'}`} id="image-popup">
      <div ref={popupContainerRef} className="popup__image-container" id="image-container">
        <button onClick={props.onClose} type="button" aria-label="Закрыть" name="imageclose-button" id="imageclose-button" className="popup__close-button"></button>
        <figure className="popup__figure">
          <img className="popup__image" alt="Картинка" src={`${props.card.link}`} />
          <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;