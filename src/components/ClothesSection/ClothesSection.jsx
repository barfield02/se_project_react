import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleAddClick,
  onCardClick,
  onCardLike,
}) {
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
        {clothingItems.map((item, owner) => {
          return (
            <ItemCard
              key={item._id}
              item={item.owner}
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
