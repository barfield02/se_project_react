import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  activeModal,
  handleCloseClick,
  isOpen,
  onRegisterModalSubmit,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, email, password })
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
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
          id="name"
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
