import ReactModal from "react-modal";
import { ModalView } from "../types";
import "./Modal.css";
import { INTRO } from "../constants";
import { saveIntroSeen } from "../storage";

export interface ModalProps extends Partial<ReactModal.Props> {
  closeModal: VoidFunction;
  modal?: ModalView | null;
}

export default function Modal({ modal, closeModal, ...rest }: ModalProps) {
  const closeIntroModal = () => {
    saveIntroSeen();
    closeModal();
  };

  return (
    <ReactModal
      {...rest}
      isOpen={!!modal}
      style={{
        content: {
          backgroundColor: "#242424",
          inset: "min(10%,160px)",
          borderRadius: 24,
        },
      }}
    >
      {modal === ModalView.INTRO ? (
        <div className="modal-content">
          {INTRO.map((p) => (
            <p>{p}</p>
          ))}
          <button onClick={closeIntroModal}>Close</button>
        </div>
      ) : null}
    </ReactModal>
  );
}
