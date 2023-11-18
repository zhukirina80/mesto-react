import {useEffect, useState} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    setUserName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]); 

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: userName,
      about: description,
    })
  } 

  return (
    <PopupWithForm 
      name="profile"
      title="Редактировать профиль"
      containerName="container"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}>
        <input type="text" id="name-input" name="nameInput" value={userName} onChange={handleChangeName} className="popup__input popup__input_type_name" placeholder="Имя профиля" minLength="2" maxLength="40" required/>
        <span className="name-input-error popup__error"></span>
        <input type="text" id="job-input" name="jobInput" value={description} onChange={handleChangeDescription} className="popup__input popup__input_type_job" placeholder="Описание профиля" minLength="2" maxLength="200" required/>
        <span className="job-input-error popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;