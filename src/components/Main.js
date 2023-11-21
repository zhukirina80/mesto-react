import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete }) {
  
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
          <button onClick={onEditAvatar} type="button" className="profile__avatar-edit-button" aria-label="Редактровать" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактровать" />
          <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить" />
          <p className="profile__job">{currentUser.about}</p>
        </div>
      </section>
      <section className="elements">
          <ul className="elements__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
          </ul>
      </section>
    </main>
  )
}

export default Main;