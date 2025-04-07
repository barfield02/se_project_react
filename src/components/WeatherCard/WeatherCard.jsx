import "../WeatherCard/WeatherCard.css";
import sunny from "../../assets/sunny.png";

function WeatherCard(weatherData) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp} &deg; F</p>
      <img src={sunny} alt="" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
