import ReactModal from "react-modal";
import { ModalView } from "../types";
import "./Modal.css";

export interface ModalProps extends Partial<ReactModal.Props> {
  closeModal: VoidFunction;
  modal?: ModalView | null;
}

export default function Modal({ modal, closeModal, ...rest }: ModalProps) {
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
          <p>welcome to summer 2024. it’s hot hot HOT outside!</p>
          <p>
            you are a U.S. citizen and you are concerned about climate change.
            you know that it’s caused by humans and that it’s driving all these
            record-breaking heat waves and flooding around the world, including
            in your home. what do!
          </p>
          <p>
            you’ve been told that living a more sustainable lifestyle can help.
            activities like biking, saving energy, and recycling will emit fewer
            greenhouse gas emissions (GHGs). that means less carbon dioxide in
            the atmosphere that traps heat and warms the planet. you want to do
            your part to help!
          </p>
          <p>what can YOU do to lower the world’s carbon footprint?</p>
          <button onClick={closeModal}>Close</button>
        </div>
      ) : null}
    </ReactModal>
  );
}
