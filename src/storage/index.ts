import { ClickerInterface } from "../reducers/clickerReducer";

export function saveIntroSeen() {
  window.localStorage.setItem("INTRO_SEEN", "1");
}

export function isIntroSeen() {
  return !!window.localStorage.getItem("INTRO_SEEN");
}

export function saveGameData(data: ClickerInterface) {
  window.localStorage.setItem("CLICKER_DATA", JSON.stringify(data));
}

export function clearGameData() {
  window.localStorage.removeItem("CLICKER_DATA");
}

// TODO: validate data at runtime
export function loadGameData() {
  try {
    const item = window.localStorage.getItem("CLICKER_DATA");
    const data = item && JSON.parse(item);
    return data;
  } catch {
    return null;
  }
}
