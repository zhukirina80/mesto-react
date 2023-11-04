import React from 'react';

function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card)
  }  

  return (
    <li className="element">
      <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }}/>
      <button type="button" className="element__delete-button" aria-label="Удалить"></button>
      <div className="element__place">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button type="button" className="element__button-like" aria-label="Нравится"></button>
          <p className="element__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;