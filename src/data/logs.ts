import { KNOWLEDGE_DROPPINGS } from "../constants";
import { ButtonInterface } from "../reducers/buttonReducer";
import { ClickerInterface } from "../reducers/clickerReducer";
import { ButtonKey } from "../types";
import { ClickButtonAction } from "../types/actions";
import buttonLogs, { LogValues } from "./buttonLogs";

export function getLogsForClick(
  state: ClickerInterface,
  action: ClickButtonAction
) {
  const { buttonId } = action;

  if (buttonLogs[buttonId as ButtonKey]) {
    const button = state.buttons.map[buttonId as ButtonKey] as ButtonInterface;
    const { clicked, unlocked } = buttonLogs[
      buttonId as ButtonKey
    ] as LogValues;

    const timesPressed = button.timesPressed as number;
    const limit = Array.isArray(clicked)
      ? Infinity
      : (unlocked ? 1 : 0) + (clicked ? 1 : 0);
    const log =
      unlocked && timesPressed === 1
        ? unlocked
        : Array.isArray(clicked)
        ? clicked[(timesPressed - 1) % clicked.length]
        : clicked;

    return typeof timesPressed === "number" && timesPressed <= limit
      ? log
      : null;
  }

  switch (buttonId) {
    case ButtonKey.selfEducate: {
      const newKnowledgeDropping =
        KNOWLEDGE_DROPPINGS[state.resources.knowledge - 1];
      return newKnowledgeDropping
        ? state.logs.concat(
            Array.isArray(newKnowledgeDropping)
              ? newKnowledgeDropping.slice().reverse()
              : newKnowledgeDropping
          )
        : state.logs;
    }
  }

  return null;
}
