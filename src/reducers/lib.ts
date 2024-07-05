import { MapLikeInterface } from "../types";
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
  };

  if (clickedButton) {
    const button = newState.buttons.map[clickedButton];
    checkReqsAction.updatedButtonPresses = getButtonPresses(newState.buttons);
    checkReqsAction.buttonsUnlocked = newState.buttons.order
      .reduce<string[]>((accum, buttonKey) => {
        const button = newState.buttons.map[buttonKey];
        return button.unlocked && (!button.oneTime || button.purchased)
          ? accum.concat(buttonKey)
          : accum;
      }, [])
      .concat(button.oneTime ? clickedButton : []);
  }

  newState.buttons.order.forEach((buttonKey) => {
    const newButton = buttonReducer(
      newState.buttons.map[buttonKey],
      checkReqsAction
    );
    newState.buttons.map[buttonKey] = buttonReducer(newButton, {
      type: ButtonActionType.CHECK_COST,
      updatedResources: newState.resources,
    });
  });
}

export function getButtonPresses(buttons: MapLikeInterface<ButtonInterface>) {
  const updatedButtonPresses = buttons.order.reduce<Record<string, number>>(
    (accum, buttonKey) => {
      accum[buttonKey] = buttons.map[buttonKey].timesPressed;
      return accum;
    },
    {}
  );
  return updatedButtonPresses;
}
