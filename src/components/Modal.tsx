import ReactModal from "react-modal";
import { GamePhase, ModalView } from "../types";
import "./Modal.css";
import { END_PHASE_1, INTRO, LOG_BOUNDARY, WALLOW } from "../constants";
import { useCallback, useContext, useMemo } from "react";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { StoryId } from "../types/storyId";

export interface ModalProps extends Partial<ReactModal.Props> {}

export default function Modal(rest: ModalProps) {
  const {
    state: { modalQueue },
  } = useContext(ClickerContext);
  const { closeModal, setStorySeen, addLogs, setPhase } = useDispatchers();
  const modal = modalQueue[0];

  const handleModalClose = useCallback(() => {
    switch (modal) {
      case ModalView.INTRO:
        addLogs(INTRO.concat(LOG_BOUNDARY));
        setStorySeen(StoryId.INTRO);
        break;
      case ModalView.END_PHASE_ONE:
        setPhase(GamePhase.TWO);
        setStorySeen(StoryId.EPIPHANY);
        break;
    }
    closeModal();
  }, [modal, addLogs, setStorySeen, setPhase, closeModal]);

  const closeText = useMemo(() => {
    switch (modal) {
      case ModalView.INTRO:
        return "Fight CO2!!";
      case ModalView.END_PHASE_ONE:
        return "Let's GOOOO";
    }
    return "Close";
  }, [modal]);

  return (
    <ReactModal
      {...rest}
      isOpen={!!modal}
      style={{
        content: {
          backgroundColor: "#242424",
          inset: "min(10%,160px) min(10%,300px)",
          height: "max-content",
          borderRadius: "var(--gap)",
          margin: "auto",
          maxHeight: "80%",
        },
      }}
    >
      <div className="modal-content">
        <>
          {modal === ModalView.INTRO
            ? [
                <>
                  welcome to summer 2024. it’s{" "}
                  <span className="hot">hot hot HOT</span> outside!
                </>,
                `you are a U.S. citizen and you are concerned about climate change. you know that it’s caused by humans and that it’s driving all these record-breaking heat waves and flooding around the world, including in your home. what do!`,
                <>
                  you’ve been told that living a more{" "}
                  <span className="eco">sustainable lifestyle</span> can help.
                  activities like biking, saving energy, and recycling will emit
                  fewer greenhouse gas emissions (GHGs). that means less carbon
                  dioxide in the atmosphere that traps heat and warms the
                  planet. you want to do your part to help!
                </>,
                <span className="warn">
                  what can <strong>YOU</strong> do to lower the world’s carbon
                  footprint?
                </span>,
              ].map((p, i) => <p key={i}>{p}</p>)
            : null}

          {modal === ModalView.WALLOW
            ? WALLOW.map((p, i) => <p key={i}>{p}</p>)
            : null}

          {modal === ModalView.END_PHASE_ONE
            ? END_PHASE_1.map((p, i) => <p key={i}>{p}</p>)
            : null}
        </>
        <button className="close-button" onClick={handleModalClose}>
          {closeText}
        </button>
      </div>
    </ReactModal>
  );
}
