import {useEffect, useState} from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const handleRequestUserInfo = () => {
    api.loadUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((error) => {
        console.log(error);
      })
  } 
  
  useEffect(() => {
    handleRequestUserInfo();
  }, []);

  const handleRequestCards = () => {
    api.getInitialCards(currentUser._id)
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
     
  useEffect(() => {
    handleRequestCards();
  }, []);

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      })
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((error) => {
        console.log(error);
      })
  }

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

  function handleUpdateUser({ name, about }) {
    api.patchUserInfo({
        name: name,
        about: about,
      })
      .then((res) => {
        currentUser.name = res.name;
        currentUser.about = res.about;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
    .then((res) => {
      currentUser.avatar = res.avatar;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({
      name: name,
      link: link,
    })
    .then((data) => {
      const newCard = data;
      setCards([newCard, ...cards]);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          setCards={setCards}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}/>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}>
        </AddPlacePopup>
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
