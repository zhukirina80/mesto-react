import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  console.log(card)
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <button onMouseDown={onClose} type="reset" className="popup__button-close" aria-label="Закрыть"></button>
        <div className="popup__image" style={{ backgroundImage: `url(${card.link})` }} />
        <h2 className="popup__title-image">{card.name}</h2>
      </div>
    </div>
  )
  
}

export default ImagePopup;