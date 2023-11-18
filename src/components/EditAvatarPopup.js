import {useState, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const [avatar, setAvatar] = useState("");
  const inputRef = useRef();

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: inputRef.current.value,
    })
  } 

  return (
    <PopupWithForm 
      name="avatar"
      title="Обновить аватар"
      containerName="container"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}>
        <input value={avatar} ref={inputRef} onChange={handleChangeAvatar}type="url" id="url-avatar-input" name="avatarInput" className="popup__input popup__input_type_avatar" placeholder="Ссылка на фото" required/>
        <span className="url-avatar-input-error popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;