import "./ItemCard.css";
function ItemCard({ item, activeModal, onCardClick }) {
  // use this as evenbt handler

  const handleImageClick = () => {
    onCardClick(item);
  };

  // call the function passed a prop
  // and pass it item

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleImageClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
