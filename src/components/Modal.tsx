import ReactModal from "react-modal";
import { ModalView } from "../types";
import "./Modal.css";
import { INTRO } from "../constants";
import { useContext } from "react";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { StoryId } from "../types/storyId";

export interface ModalProps extends Partial<ReactModal.Props> {}

export default function Modal(rest: ModalProps) {
  const {
    state: { modal },
  } = useContext(ClickerContext);
  const { closeModal, setStorySeen, addLogs } = useDispatchers();

  const closeIntroModal = () => {
    closeModal();
    addLogs(INTRO);
    setStorySeen(StoryId.INTRO);
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
