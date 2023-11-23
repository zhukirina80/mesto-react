import { useContext } from 'react';
import { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";
import useForm from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({ name: '', about: '' });

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser(values);
  }

  useEffect(() => {
    setValues({ name:currentUser.name || '', about:currentUser.about || '' });
  }, [currentUser, isOpen]);
  
  return (
    <PopupWithForm 
      name="profile"
      title="Редактировать профиль"
      containerName="container"
      textBtn={isLoading ? 'Сохранение...' : 'Сохранить'}      
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}>
        <input type="text" id="name-input" name="name" value={values.name} onChange={handleChange} className="popup__input popup__input_type_name" placeholder="Имя профиля" minLength="2" maxLength="40" required/>
        <span className="name-input-error popup__error" />
        <input type="text" id="job-input" name="about" value={values.about} onChange={handleChange} className="popup__input popup__input_type_job" placeholder="Описание профиля" minLength="2" maxLength="200" required/>
        <span className="job-input-error popup__error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;