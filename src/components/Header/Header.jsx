import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SideBar from "../SideBar/SideBar";
function Header({
  handleAddClick,
  weatherData,
  onLogOut,
  onProfileChange,
  isLoggedIn,
  onLogin,
  onRegister,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="logo" src={logo} />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">Terrence Tegegne</p>
              <img
                src={avatar}
                alt="Terrence Tegegne"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={onLogin}
            type="button"
            className="header__sign-in-button"
          >
            {" "}
            Login
          </button>
          <button
            onClick={onRegister}
            type="button"
            className="header__sign-up-button"
          >
            Sign Up
          </button>
        </>
      )}
      {isLoggedIn && (
        <SideBar onLogOut={onLogOut} onProfileChange={onProfileChange} />
      )}
    </header>
  );
}

export default Header;
