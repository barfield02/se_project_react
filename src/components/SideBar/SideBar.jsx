import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onLogOut, onProfileChange }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <span
          className="navigation__user navigation__user_location_profile navigation__user_type_none"
          style={{
            backgroundImage: `url(${currentUser.avatar}`,
          }}
        >
          {currentUser && !currentUser.avatar && `${currentUser.name}`[0]}
        </span>
        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item">
          <button
            type="button"
            className="sidebar__nav-button"
            onClick={onProfileChange}
            aria-label="change profile data"
          ></button>
        </li>
        <li className="sidebar__nav-item">
          <button
            type="button"
            className="sidebar__logout-button"
            onClick={onLogOut}
            aria-label="Log out"
          >
            {" "}
            Log Out
          </button>
          <span onClick={onLogOut}>Log Out</span>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
