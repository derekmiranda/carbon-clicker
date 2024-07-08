import { ButtonKey, MapLikeInterface } from "../types";
import buttonReducer, {
  ButtonActionType,
  ButtonInterface,
  CheckRequirementsAction,
} from "./buttonReducer";
import { ClickerInterface } from "./clickerReducer";

export function checkReqsAndCosts(
  newState: ClickerInterface,
  clickedButton?: string
) {
  const checkReqsAction: CheckRequirementsAction = {
    type: ButtonActionType.CHECK_REQUIREMENTS,
    updatedResources: newState.resources,
    phase: newState.phase,
  };

  checkReqsAction.buttonsUnlocked = newState.buttons.order.reduce<string[]>(
    (accum, buttonKey) => {
      const button = newState.buttons.map[
        buttonKey as ButtonKey
      ] as ButtonInterface;
      return button.unlocked && (!button.oneTime || button.purchased)
        ? accum.concat(buttonKey)
        : accum;
    },
    []
  );
  checkReqsAction.updatedButtonPresses = getButtonPresses(newState.buttons);

  if (clickedButton) {
    const button = newState.buttons.map[
      clickedButton as ButtonKey
    ] as ButtonInterface;
    if (button.oneTime) {
      checkReqsAction.buttonsUnlocked.push(clickedButton);
    }
  }

  newState.buttons.order.forEach((buttonKey) => {
    const newButton = buttonReducer(
      newState.buttons.map[buttonKey as ButtonKey] as ButtonInterface,
      checkReqsAction
    );
    (newState.buttons.map[buttonKey as ButtonKey] as ButtonInterface) =
      buttonReducer(newButton, {
        type: ButtonActionType.CHECK_COST,
        updatedResources: newState.resources,
      });
  });
}

export function getButtonPresses(buttons: MapLikeInterface<ButtonInterface>) {
  const updatedButtonPresses = buttons.order.reduce<Record<string, number>>(
    (accum, buttonKey) => {
      accum[buttonKey] = (
        buttons.map[buttonKey as ButtonKey] as ButtonInterface
      ).timesPressed;
      return accum;
    },
    {}
  );
  return updatedButtonPresses;
}
