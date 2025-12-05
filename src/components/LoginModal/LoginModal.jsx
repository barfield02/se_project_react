import "./LoginModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  activeModal,
  handleCloseClick,
  isOpen,
  onLoginModalSubmit,
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({ name, password })
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error logging in user:", error);
      });
  };
  useEffect(() => {
    console.log("LoginModal useEffect has run");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Login in"
      buttonText="Sign in"
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
          id="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
