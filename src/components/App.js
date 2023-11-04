import {useState} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page__container">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm 
        name="profile"
        title="Редактировать профиль"
        containerName="container"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
          <input type="text" id="name-input" name="nameInput" className="popup__input popup__input_type_name" placeholder="Имя профиля" minLength="2" maxLength="40" required/>
          <span className="name-input-error popup__error"></span>
          <input type="text" id="job-input" name="jobInput" className="popup__input popup__input_type_job" placeholder="Описание профиля" minLength="2" maxLength="200" required/>
          <span className="job-input-error popup__error"></span>
      </PopupWithForm>
      <PopupWithForm 
        name="element"
        title="Новое место"
        containerName="container"
        textBtn="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <input type="text" id="title-input" name="titleInput" className="popup__input popup__input_type_title" placeholder="Название" minLength="2" maxLength="30" required/>
          <span className="title-input-error popup__error"></span>
          <input type="url" id="url-input" name="linkInput" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required/>
          <span className="url-input-error popup__error"></span>
      </PopupWithForm>
      <PopupWithForm 
        name="avatar"
        title="Обновить аватар"
        containerName="container"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
          <input type="url" id="url-avatar-input" name="avatarInput" className="popup__input popup__input_type_avatar" placeholder="Ссылка на фото" required/>
          <span className="url-avatar-input-error popup__error"></span>
      </PopupWithForm>
      <PopupWithForm 
        name="delete-card"
        title="Вы уверены?"
        containerName="delete-card-container"
        textBtn="Да">
      </PopupWithForm>
      <ImagePopup 
        card={selectedCard} 
        isOpen={selectedCard._id !== undefined} 
        onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
