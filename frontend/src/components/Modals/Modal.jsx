import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import ClipLoader from "react-spinners/ClipLoader";
import "./Modal.css";

const Modal = ({ header, submitAction, buttonText, isRegister }) => {
  const { auth } = useGlobalContext();
  const { modal } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const handleClose = () => modal.closeModal();
  const handleSwitch = () => modal.openModal(!isRegister);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Basic validations
    if (Object.values(data).some((value) => value === "")) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (isRegister && data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const action = isRegister ? auth.register : auth.login;

    action(data)
      .then(() => modal.closeModal())
      .finally(() => setLoading(false));
  };

  return (
    <div className="modal-container">
      <div className="modal">
        {/* Close button */}
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>

        {/* Header */}
        <h2 className="modal-title">{header}</h2>

        {/* Form */}
        <form onSubmit={submitForm} className="modal-form">
          {isRegister && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" className="form-control" />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" />
          </div>

          {isRegister && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
              />
            </div>
          )}

          <button type="submit" className="btn-submit">
            {buttonText}
            <span className="loader-wrapper">
              <ClipLoader loading={loading} size={16} />
            </span>
          </button>
        </form>

        {/* Switch between login/register */}
        <div className="modal-footer">
          {isRegister ? (
            <>
              Already have an account?
              <button type="button" onClick={handleSwitch} className="btn-link">
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?
              <button type="button" onClick={handleSwitch} className="btn-link">
                Create One
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
