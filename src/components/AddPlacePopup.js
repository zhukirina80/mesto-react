import {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name: name,
      link: link,
    })
  } 

  return (
    <PopupWithForm 
      name="element"
      title="Новое место"
      containerName="container"
      textBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onAddPlace={onAddPlace}>
        <input type="text" value={name} onChange={handleChangeName} id="title-input" name="titleInput" className="popup__input popup__input_type_title" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="title-input-error popup__error"></span>
        <input type="url" value={link} onChange={handleChangeLink} id="url-input" name="linkInput" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required/>
        <span className="url-input-error popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;