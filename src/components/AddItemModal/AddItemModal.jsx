import "./AddItemModal.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
export default function AddItemModal({
  activeModal,
  handleCloseClick,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    //update clothingItems array
    onAddItemModalSubmit({ name, imageUrl, weather });
    //empty the inputs
    setName("");
    setImageUrl("");
    setWeather("");
  };
  return (
    <ModalWithForm
      title="New garment"
      buttonText=""
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className=" modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={(e) => {
              setWeather(e.target.value);
            }}
            value="hot"
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className=" modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={(e) => {
              setWeather(e.target.value);
            }}
            value="warm"
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className=" modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weatherType"
            onChange={(e) => {
              setWeather(e.target.value);
            }}
            value="cold"
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
