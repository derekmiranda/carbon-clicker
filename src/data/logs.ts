import { KNOWLEDGE_DROPPINGS } from "../constants";
import { ClickerInterface } from "../reducers/clickerReducer";
import { ButtonKey } from "../types";
import { ClickButtonAction } from "../types/actions";

const limitLogs = ({
  newLogs,
  state,
  action,
  limit,
}: {
  newLogs: string | string[];
  state: ClickerInterface;
  action: ClickButtonAction;
  limit: number;
}) => {
  const { buttonId } = action;
  const timesPressed = state.buttons.map[buttonId as ButtonKey]?.timesPressed;

  return typeof timesPressed === "number" && timesPressed <= limit
    ? newLogs
    : null;
};

export function getLogsForClick(
  state: ClickerInterface,
  action: ClickButtonAction
) {
  const { buttonId } = action;

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

    case ButtonKey.turnOffLights: {
      return limitLogs({
        newLogs: `climate action is as easy as the flick of a switch!`,
        limit: 1,
        state,
        action,
      });
    }

    case ButtonKey.bikeInsteadOfDrive: {
      return limitLogs({
        newLogs: `tone those calves!`,
        limit: 1,
        state,
        action,
      });
    }
  }

  return null;
}
