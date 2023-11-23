import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const inputRef = useRef();

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
      textBtn={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateAvatar={onUpdateAvatar}>
        <input ref={inputRef} type="url" id="url-avatar-input" name="avatarInput" className="popup__input popup__input_type_avatar" placeholder="Ссылка на фото" required/>
        <span className="url-avatar-input-error popup__error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;