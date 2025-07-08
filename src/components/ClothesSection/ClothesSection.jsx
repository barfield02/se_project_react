import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__add">
        <p className="clothes-section__your-items">Your items</p>
        <button className="clothes-section__add-button">Add New</button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              //onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
