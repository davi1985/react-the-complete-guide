import { memo, ReactNode } from "react";
import "./ErrorModal.css";

type ErrorModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const ErrorModal = memo(({ onClose, children }: ErrorModalProps) => {
  return (
    <>
      <div className="backdrop" onClick={onClose} />

      <div className="error-modal">
        <h2>An Error Occurred!</h2>

        <p>{children}</p>

        <div className="error-modal__actions">
          <button type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </>
  );
});

export default ErrorModal;
