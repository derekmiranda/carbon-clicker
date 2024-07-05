import ReactModal from "react-modal";
import { ModalView } from "../types";
import "./Modal.css";
import { END_PHASE_1, INTRO, LOG_BOUNDARY } from "../constants";
import { useCallback, useContext } from "react";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { StoryId } from "../types/storyId";

export interface ModalProps extends Partial<ReactModal.Props> {}

export default function Modal(rest: ModalProps) {
  const {
    state: { modal },
  } = useContext(ClickerContext);
  const { closeModal, setStorySeen, addLogs } = useDispatchers();

  const handleModalClose = useCallback(() => {
    switch (modal) {
      case ModalView.INTRO:
        addLogs(INTRO.concat(LOG_BOUNDARY));
        setStorySeen(StoryId.INTRO);
        break;
    }
    closeModal();
  }, [modal, addLogs, setStorySeen, closeModal]);

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
      <div className="modal-content">
        <>
          {modal === ModalView.INTRO
            ? INTRO.map((p, i) => <p key={i}>{p}</p>)
            : null}
          {modal === ModalView.END_PROTOTYPE
            ? END_PHASE_1.concat(LOG_BOUNDARY).map((p, i) => <p key={i}>{p}</p>)
            : null}
        </>
        <button className="close-button" onClick={handleModalClose}>
          Close
        </button>
      </div>
    </ReactModal>
  );
}
