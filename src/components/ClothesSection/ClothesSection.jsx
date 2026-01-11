import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleAddClick,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__add">
        <p className="clothes-section__your-items">Your items</p>
        <button
          onClick={handleAddClick}
          className="clothes-section__add-button"
        >
          Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
