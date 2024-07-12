import ReactModal from "react-modal";
import { GamePhase, ModalView, Pathway } from "../types";
import "./Modal.css";
import {
  END_PHASE_1,
  INTRO,
  LEARNING_DROPPING,
  LOG_BOUNDARY,
  WALLOW,
} from "../constants";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { ClickerContext } from "../reducers/context";
import useDispatchers from "../hooks/useDispatchers";
import { StoryId } from "../types/storyId";
import { describeEffects } from "../utils";

export interface ModalProps extends Partial<ReactModal.Props> {}

function ModalContent({ children }: { children: string | string[] }) {
  return (
    <>
      {Array.isArray(children)
        ? children.map((child) => <p key={child}>{child}</p>)
        : children}
    </>
  );
}

export default function Modal(rest: ModalProps) {
  const {
    state: { modalQueue },
    ticker,
    audio,
  } = useContext(ClickerContext);
  const { closeModal, setStorySeen, addLogs, setPhase, setPathway } =
    useDispatchers();
  const { setPaused } = ticker!;
  const { playClickSFX, playEventSFX, playUpgradeSFX, playWallowSFX } = audio!;
  const modal = modalQueue[0];
  const { view } = modal || {};

  useEffect(() => {
    if (view) {
      setPaused(true);
    }

    switch (view) {
      case ModalView.PPM_EVENT: {
        playEventSFX();
        return;
      }

      case ModalView.LEARNING:
      case ModalView.WALLOW: {
        playWallowSFX();
        return;
      }

      case ModalView.INTRO:
      case ModalView.CHOOSE_PATHWAY:
      case ModalView.END_PHASE_ONE: {
        playUpgradeSFX();
        return;
      }
    }
  }, [view, setPaused, playEventSFX, playUpgradeSFX, playWallowSFX]);

  const handleModalClose = useCallback(() => {
    switch (view) {
      case ModalView.INTRO:
        addLogs(INTRO.concat(LOG_BOUNDARY));
        setStorySeen(StoryId.INTRO);
        break;
      case ModalView.END_PHASE_ONE:
        setPhase(GamePhase.TWO);
        setStorySeen(StoryId.EPIPHANY);
        break;
    }
    setPaused(false);
    playClickSFX();
    closeModal();
  }, [
    view,
    addLogs,
    setStorySeen,
    setPhase,
    closeModal,
    setPaused,
    playClickSFX,
  ]);

  const closeText = useMemo(() => {
    switch (view) {
      case ModalView.INTRO:
        return "Fight CO2!!";
      case ModalView.END_PHASE_ONE:
        return "Let's GOOOO";
      case ModalView.PAUSE:
        return "Resume";
    }
    return "Close";
  }, [view]);

  const closeSection = (() => {
    switch (view) {
      case ModalView.CHOOSE_PATHWAY: {
        const chooseRevolution = () => {
          setPathway(Pathway.REVOLUTION);
          handleModalClose();
        };
        const chooseCooperation = () => {
          setPathway(Pathway.COOPERATION);
          handleModalClose();
        };
        return (
          <div className="button-row">
            <button
              className="close-button close-button--multiple"
              onClick={chooseCooperation}
            >
              Cooperation
              <span className="button-detail">
                take control of the reins! for those who believe global
                cooperation and policy-making is key.
              </span>
              <span className="button-detail">
                {" "}
                enables working within government, disables property
                destruction.
              </span>
            </button>
            <button
              className="close-button close-button--multiple"
              onClick={chooseRevolution}
            >
              Revolution
              <span className="button-detail">
                overthrow the government! for those who don’t believe we’ll get
                anywhere with world powers as they are.
              </span>
              <span className="button-detail">
                enables property destruction, disables working within
                government.
              </span>
            </button>
          </div>
        );
      }
    }
    return (
      <button className="close-button" onClick={handleModalClose}>
        {closeText}
      </button>
    );
  })();

  return (
    <ReactModal
      {...rest}
      isOpen={!!view}
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
          {view === ModalView.INTRO
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

          {view === ModalView.WALLOW ? (
            <ModalContent>{WALLOW}</ModalContent>
          ) : null}

          {view === ModalView.END_PHASE_ONE
            ? END_PHASE_1.map((p, i) => <p key={i}>{p}</p>)
            : null}

          {view === ModalView.LEARNING
            ? LEARNING_DROPPING.map((p, i) => <p key={i}>{p}</p>)
            : null}

          {view === ModalView.PPM_EVENT && modal.props?.content ? (
            <>
              <p>{modal.props.content}</p>
              {modal.props.effects ? (
                <p className="event-effect">
                  {describeEffects(modal.props.effects)}
                </p>
              ) : null}
            </>
          ) : null}

          {view === ModalView.CHOOSE_PATHWAY && modal.props?.content ? (
            <ModalContent>{modal.props.content}</ModalContent>
          ) : null}

          {view === ModalView.PAUSE ? (
            <div className="modal--centered">
              <h3>paused</h3>
              <p>don't forget to take breaks and move around if you need!</p>
            </div>
          ) : null}
        </>
        {closeSection}
      </div>
    </ReactModal>
  );
}
