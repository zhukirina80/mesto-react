import React from 'react';

function PopupWithForm({ title, name, containerName, children, textBtn, isOpen, onClose }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__${containerName}`}>
        <button onMouseDown={onClose} type="reset" className="popup__button-close" aria-label="Закрыть"></button>
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}-form`} className={`popup__form popup__form_${name}`}>
          {children}
          <button type="submit" className={`popup__button popup__button_type_${name}`}>
            {textBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;