import {
  DEFAULT_KNOWLEDGE_DROPPING,
  KNOWLEDGE_DROPPINGS,
  PHASE_1_KNOWLEDGE_GAIN,
  PHASE_2_KNOWLEDGE_GAIN,
  COOPERATION_KNOWLEDGE_DROPPINGS,
  REVOLUTION_KNOWLEDGE_DROPPINGS,
} from "../constants";
import { ButtonInterface } from "../reducers/buttonReducer";
import { ClickerInterface } from "../reducers/clickerReducer";
import { ButtonKey, GamePhase, Pathway } from "../types";
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
      const selfEducateButton = state.buttons.map[
        ButtonKey.selfEducate
      ] as ButtonInterface;
      const newKnowledgeDropping = state.pathway
        ? state.pathway === Pathway.COOPERATION
          ? COOPERATION_KNOWLEDGE_DROPPINGS[
              state.endgameSelfEducateTimesPressed
            ]
          : REVOLUTION_KNOWLEDGE_DROPPINGS[state.endgameSelfEducateTimesPressed]
        : KNOWLEDGE_DROPPINGS[selfEducateButton.timesPressed - 1];
      return (
        newKnowledgeDropping ||
        DEFAULT_KNOWLEDGE_DROPPING(
          state.phase === GamePhase.ONE
            ? PHASE_1_KNOWLEDGE_GAIN
            : PHASE_2_KNOWLEDGE_GAIN
        )
      );
    }
  }

  return null;
}
