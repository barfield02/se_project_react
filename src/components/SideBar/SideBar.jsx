import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onLogOut, onProfileChange }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={currentUser.avatar}></img>
        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item">
          <button
            type="button"
            className="sidebar__nav-button"
            onClick={onProfileChange}
            //aria-label="change profile data"
          >
            Change profile data
          </button>
        </li>
        <li className="sidebar__nav-item">
          <button
            type="button"
            className="sidebar__logout-button"
            onClick={onLogOut}
            //aria-label="Log out"
          >
            {" "}
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
