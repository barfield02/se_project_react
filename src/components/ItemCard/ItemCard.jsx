import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked =
    currentUser &&
    item.likes &&
    item.likes.some((id) => id === currentUser._id);

  const handleImageClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: item.isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleImageClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button
        className={`card__like-button ${
          isLiked ? "card__like-button_is-active" : ""
        }`}
        onClick={handleLike}
      />
    </li>
  );
}
export default ItemCard;
