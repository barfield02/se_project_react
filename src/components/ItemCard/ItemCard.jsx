import "./ItemCard.css";
function ItemCard({ item, activeModal }) {
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
