import Clicker from "./components/Clicker";

import "./App.css";
import { useClicker } from "./reducers";
import { ClickerContext } from "./reducers/context";

function App() {
  const clicker = useClicker();
  const { state, dispatch } = clicker;
  return (
    <ClickerContext.Provider value={{ state, dispatch }}>
      {" "}
      <Clicker />
    </ClickerContext.Provider>
  );
}

export default App;
