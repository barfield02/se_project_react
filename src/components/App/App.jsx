import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import * as auth from "../../utils/auth.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { Routes, Route } from "react-router-dom";
import { getItems, getUserInfo } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import { addItem } from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModel.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { addCardLike, removeCardLike } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSigninClick = () => {
    setActiveModal("signin");
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
  };
  const handleCloseClick = () => {
    setActiveModal("");
  };

  const onProfileChange = () => {
    setActiveModal("change profile data");
  };

  // opens up the ItemModal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = (item) => {
    const token = localStorage.getItem("jwt"); // ← Get the token

    return addItem(item, token).then((newItem) => {
      // ← Pass the token

      // Add the new item to your clothing items state
      setClothingItems([newItem.data, ...clothingItems]);

      // Close the modal
      //closeActiveModal();
      handleCloseClick();
    });
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt"); // ← Get the token
    deleteItem(id, token)
      .then(() => {
        // Remove the item from your local state
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        handleCloseClick();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const onEditModalSubmit = ({ name, avatar }) => {
    return auth
      .edit(name, avatar)
      .then((updatedUser) => {
        // update app state so the UI shows the new profile
        setCurrentUser(updatedUser);
        handleCloseClick(); // close the modal
        return updatedUser;
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
        throw err;
      });
  };

  const onRegister = ({ name, avatar, email, password }, resetForm) => {
    auth
      .register(name, avatar, email, password)
      .then((res) => {
        const userData = {
          name,
          avatar,
          email,
          password,
        };
        resetForm();
        handleCloseClick();
        onLogin(userData);
      })
      .catch((err) => console.log(err));
  };

  const onLogin = ({ email, password }) =>
    auth
      .signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          handleCloseClick();
        }
      })
      .catch((err) => console.log(err));

  const handleRegister = (name, avatar, email, password) => {
    auth
      .register(name, avatar, email, password)
      .then((data) => {
        // Registration successful
        handleCloseClick();
        // Automatically sign user in
        return auth.signin(email, password);
      })
      .then((loginData) => {
        localStorage.setItem("jwt", loginData.token);
        setCurrentUser(loginData.user);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect((data) => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLogOut={onLogOut}
              onProfileChange={onProfileChange}
              isLoggedIn={isLoggedIn}
              handleSigninClick={handleSigninClick}
              handleSignupClick={handleSignupClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    loggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onLogOut={onLogOut}
                      onProfileChange={onProfileChange}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            handleCloseClick={handleCloseClick}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={handleCloseClick}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            isOpen={activeModal === "signup"}
            onRegisterModalSubmit={onRegister}
            onSwitchToLogin={() => setActiveModal("signin")}
          />
          <LoginModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            isOpen={activeModal === "signin"}
            onLoginModalSubmit={onLogin}
            onSwitchToRegister={() => setActiveModal("signup")}
          />
          <EditProfileModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            isOpen={activeModal === "change profile data"}
            onProfileChange={onProfileChange}
            onEditModalSubmit={onEditModalSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
