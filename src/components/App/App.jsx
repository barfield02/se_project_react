import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { defaultClothingItems } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";
import { getItems } from "../../utils/api.js";
import { deleteItem } from "../../utils/api.js";
import { addItem } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCloseClick = () => {
    setActiveModal("");
  };

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
    addItem(item)
      .then((newItem) => {
        // Add the new item to your clothing items state
        setClothingItems([newItem, ...clothingItems]);
        // Close the modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    //update clothing array
    setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]);
    //close the modal
    handleCloseClick();
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        // Remove the item from your local state
        setClothingItems(clothingItems.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
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
    getItems();
    //.catch(console.error);
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          handleCloseClick={handleCloseClick}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={handleCloseClick}
          handleDeleteItem={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
