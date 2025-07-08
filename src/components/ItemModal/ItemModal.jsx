import "./ItemModal.css";
function ItemModal({ activeModal, handleCloseClick, card, handleDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__weather-block">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">weather: {card.weather}</p>
          </div>
          <div
            className="modal__delete-button"
            onClick={() => handleDeleteItem(card._id)}
          >
            <p className="modal__delete-button-text">Delete item</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
