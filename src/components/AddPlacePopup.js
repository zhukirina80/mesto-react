import { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import useForm from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const { values, handleChange, setValues } = useForm({ name: '', link: '' });
  
  function handleSubmit(e) {
    e.preventDefault();
    
    onAddPlace(values);
  }

  useEffect(() => {
    setValues({ name: '', link: '' });
  }, [isOpen]);

  return (
    <PopupWithForm 
      name="element"
      title="Новое место"
      containerName="container"
      textBtn={isLoading ? 'Сохранение...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onAddPlace={onAddPlace}>
        <input type="text" value={values.name} onChange={handleChange} id="title-input" name="name" className="popup__input popup__input_type_title" placeholder="Название" minLength="2" maxLength="30" required/>
        <span className="title-input-error popup__error"/>
        <input type="url" value={values.link} onChange={handleChange} id="url-input" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required/>
        <span className="url-input-error popup__error"/>
    </PopupWithForm>
  )
}

export default AddPlacePopup;