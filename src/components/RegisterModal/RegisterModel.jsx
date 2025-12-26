import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  activeModal,
  handleCloseClick,
  isOpen,
  onRegisterModalSubmit,
  onSwitchToLogin,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, email, password, avatar }, () => {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    });
    //.then(() => {
    //  setName("");
    // setEmail("");
    // setPassword("");
    // setAvatar("");
    // })
    // .catch((error) => {
    // console.error("Error registering user:", error);
    //});
  };
  useEffect(() => {
    console.log("RegisterModal useEffect has run");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign up"
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <label htmlFor="url" className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="register-url"
          placeholder="Avatar"
          required
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
        />
      </label>
      <button
        type="button"
        className="modal__switch-button"
        onClick={() => {
          // optional: clear local form state here
          onSwitchToLogin();
        }}
      >
        or Sign in
      </button>
    </ModalWithForm>
  );
}
