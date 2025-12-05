import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleAddClick, onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__add">
        <p className="clothes-section__your-items">Your itemss</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-button"
        >
          Add Newss
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
