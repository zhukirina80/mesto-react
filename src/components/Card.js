import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__button-like ${isLiked && 'element__button-like_active'}` 
  );
  
  function handleClick() {
    onCardClick(card);
  }  

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  
  return (
    <li className="element">
      <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }}/>
      {isOwn && <button className="element__delete-button" onClick={handleDeleteClick} />}
      <div className="element__place">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} aria-label="Нравится"/>
          <p className="element__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;