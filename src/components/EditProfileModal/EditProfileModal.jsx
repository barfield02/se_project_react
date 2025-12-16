import "./EditProfileModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  isOpen,
  onLoginModalSubmit,
  onProfileChange,
  onEditModalSubmit,
  activeModal,
  handleCloseClick,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Get current user data
  const currentUser = useContext(CurrentUserContext);

  // Pre-fill form when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onEditModalSubmit({ name, avatar })
      .then(() => {
        setName("");
        setAvatar("");
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    console.log("EditProfileModal useEffect has run");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="change profile data"
      buttonText="save changes"
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onProfileChange={onProfileChange}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      <label htmlFor="url" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="url"
          placeholder="Avatar"
          required
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
