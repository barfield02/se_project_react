import "./LoginModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  activeModal,
  handleCloseClick,
  isOpen,
  onLoginModalSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    onLoginModalSubmit({ email, password })
      .then(() => {
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
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="text"
          className="modal__input"
          id="email"
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
