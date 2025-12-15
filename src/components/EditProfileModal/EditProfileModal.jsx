import "./EditProfileModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({
  activeModal,
  handleCloseClick,
  isOpen,
  onLoginModalSubmit,
  onProfileChange,
  onEditModalSubmit,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onEditModalSubmit({ name, avatar })
      .then(() => {
        setName("");
        setAvatar("");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
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
          id="name"
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
