import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? "element__delete-button_active" : " "}`
  );
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-button ${isLiked && "element__like-button_active"}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    if (isOwn) {
      props.onCardDelete(props.card);
    }
  }

  return (
    <div className="element">
      <button type="button" aria-label="Удалить" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
      <div className="element__image" alt="Картинка" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} ></div>
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-info">
          <button type="button" aria-label="Нравится" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <h3 className="element__like-number">{props.card.likes.length}</h3>
        </div>
      </div>
    </div>
  )
}

export default Card;