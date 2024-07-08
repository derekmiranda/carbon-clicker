import Clicker from "./components/Clicker";

import "./App.css";
import { useClicker } from "./reducers";
import { ClickerContext } from "./reducers/context";
import { useRef } from "react";
import Modal from "./components/Modal";

function App() {
  const clicker = useClicker();
  const { state, dispatch } = clicker;
  const appRef = useRef<HTMLElement>(document.getElementById("root"));

  return (
    <ClickerContext.Provider value={{ state, dispatch }}>
      <Clicker />
      <Modal appElement={appRef.current!} />
    </ClickerContext.Provider>
  );
}

export default App;
