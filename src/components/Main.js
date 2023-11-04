import {useEffect, useState} from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  const handleRequestUserInfo = () => {
    api.loadUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((error) => {
        console.log(error);
      })
  } 
  
  useEffect(() => {
    handleRequestUserInfo();
  }, []);

  const handleRequestCards = () => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
     
  useEffect(() => {
    handleRequestCards();
  }, []);
  
  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}/>
          <button onClick={onEditAvatar} type="button" className="profile__avatar-edit-button" aria-label="Редактровать"></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button onClick={onEditProfile} type="button" className="profile__edit-button" aria-label="Редактровать"></button>
          <button onClick={onAddPlace} type="button" className="profile__add-button" aria-label="Добавить"></button>
          <p className="profile__job">{userDescription}</p>
        </div>
      </section>
      <section className="elements">
          <ul className="elements__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
            />
          ))}
          </ul>
      </section>
    </>
  )
}

export default Main;