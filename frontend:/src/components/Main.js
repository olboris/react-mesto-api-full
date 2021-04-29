import React from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile-avatar">
          <div className="profile-avatar__image" alt="Аватар" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
          <button onClick={props.onEditAvatar} type="button" aria-label="Редактировать" className="profile-avatar__button"></button>
        </div>
        <div className="profile-info">
          <div className="profile-info__heading">
            <h1 className="profile-info__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} type="button" aria-label="Редактировать" className="profile-info__edit-button" id="edit-button"></button>
          </div>
          <p className="profile-info__specialty">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" aria-label="Добавить" className="profile__add-button"></button>
      </section>
      <section className="elements">
        <div className="elements__list">
          {props.cards.map((item) => {
            return (<Card card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={item._id} />)
          })}
        </div>
      </section>
    </main>
  );

}

export default Main;