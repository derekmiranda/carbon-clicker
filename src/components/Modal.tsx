import ReactModal from "react-modal";
import { ModalView } from "../types";
import "./Modal.css";
import { INTRO, LOG_BOUNDARY } from "../constants";
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
    addLogs(INTRO.concat(LOG_BOUNDARY));
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
          {INTRO.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <button className="close-button" onClick={closeIntroModal}>
            Close
          </button>
        </div>
      ) : null}
    </ReactModal>
  );
}
