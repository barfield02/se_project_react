import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onLogOut,
  onProfileChange,
  isLoggedIn,
  handleSigninClick,
  handleSignupClick,
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
      {isLoggedIn ? (
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
              <p className="header__username">{currentUser?.name ?? "User"}</p>
              {/* Avatar image or first-letter placeholder */}
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={
                    currentUser.name
                      ? `${currentUser.name} avatar`
                      : "User avatar"
                  }
                  className="header__avatar"
                />
              ) : (
                <span className="header__avatar-placeholder" aria-hidden="true">
                  {(currentUser?.name && currentUser.name[0].toUpperCase()) ||
                    "U"}
                </span>
              )}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleSigninClick}
            type="button"
            className="header__sign-in-button"
          >
            {" "}
            Login
          </button>
          <button
            onClick={handleSignupClick}
            type="button"
            className="header__sign-up-button"
          >
            Sign Up
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
