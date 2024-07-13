import { ButtonInterface } from "../reducers/buttonReducer";
import { ButtonKey, ButtonKeyMap, MapLikeInterface } from "../types";

const makeAllButtonsHidden: (
  shownButtons?: string[]
) => (
  currentButtons: MapLikeInterface<ButtonInterface>
) => MapLikeInterface<ButtonInterface> =
  (shownButtons = []) =>
  (currentButtons) => ({
    ...currentButtons,
    map: Object.keys(currentButtons.map).reduce<ButtonKeyMap<ButtonInterface>>(
      (accum, key) => {
        const button = currentButtons.map[key];
        const { oneTime, purchased, unlocked } = button!;
        return {
          ...accum,
          [key]: {
            ...currentButtons.map[key as ButtonKey],
            unlocked:
              shownButtons.includes(key) || (oneTime && unlocked && purchased),
          },
        };
      },
      {}
    ),
  });

const endingButtonSequence: ReturnType<typeof makeAllButtonsHidden>[] = [
  makeAllButtonsHidden(),
  makeAllButtonsHidden([ButtonKey.takeABreak]),
  makeAllButtonsHidden([ButtonKey.bikeInsteadOfDrive]),
  makeAllButtonsHidden([ButtonKey.cookVegMeal]),
  makeAllButtonsHidden([ButtonKey.turnOffLights]),
];

export default endingButtonSequence;
