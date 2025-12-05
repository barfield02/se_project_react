import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import * as auth from "../../utils/auth.js";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { Routes, Route } from "react-router-dom";
import { getItems, getUserInfo } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import { addItem } from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal /RegisterModel.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

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

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const onProfileChange = () => {
    setActiveModal("edit");
  };

  // opens up the ItemModal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleImageClick = () => {
    setActiveModal(item);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddItemSubmit = (item) => {
    return addItem(item).then((newItem) => {
      // Add the new item to your clothing items state
      setClothingItems([newItem, ...clothingItems]);

      // Close the modal
      //closeActiveModal();
      handleCloseClick();
    });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    //update clothing array
    setClothingItems([
      {
        name,
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
        weather,
      },
      ...clothingItems,
    ]);
    //close the modal
    handleCloseClick();
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        // Remove the item from your local state
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        handleCloseClick();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const onRegister = ({ name, avatar, email, password }, resetForm) => {
    auth
      .register(name, avatar, email, password)
      .then((res) => {
        if (res._id) {
          const userData = {
            name,
            avatar,
            email,
            password,
          };
          resetForm();
          onLogin(userData);
        }
      })
      .catch((err) => console.log(err));
  };

  const onLogin = ({ email, password }, resetForm) => {
    auth
      .signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          //TODO: close all modals, fetchUserInfo
          resetForm(); //TODO if error comes up with resetForm, this may need a function
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (name, avatar, email, password) => {
    auth
      .register(name, avatar, email, password)
      .then((data) => {
        // Registration successful
        setActiveModal("");
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
  };

  useEffect((data) => {
    getWeather(coordinates, APIkey)
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
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onLogOut={onLogOut}
                      onProfileChange={onProfileChange}
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
            isOpen={activeModal === "register"}
            onRegisterModalSubmit={onRegister}
          />
          <LoginModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            isOpen={activeModal === "signin"}
            onLoginModalSubmit={onLogin}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
