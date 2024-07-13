import { ButtonInterface } from "../reducers/buttonReducer";
import { ButtonKey, ButtonKeyMap, MapLikeInterface } from "../types";
import { buttons } from "./buttons";

const makeAllButtonsHidden: (
  shownButtons?: string[]
) => MapLikeInterface<ButtonInterface> = (shownButtons = []) => ({
  ...buttons,
  map: Object.keys(buttons.map).reduce<ButtonKeyMap<ButtonInterface>>(
    (accum, key) => {
      // disable button
      return {
        ...accum,
        [key]: {
          ...buttons.map[key as ButtonKey],
          unlocked: shownButtons.includes(key),
        },
      };
    },
    {}
  ),
});

const endingButtonSequence: MapLikeInterface<ButtonInterface>[] = [
  makeAllButtonsHidden(),
  makeAllButtonsHidden([ButtonKey.takeABreak]),
  makeAllButtonsHidden([ButtonKey.bikeInsteadOfDrive]),
  makeAllButtonsHidden([ButtonKey.cookVegMeal]),
  makeAllButtonsHidden([ButtonKey.turnOffLights]),
];

export default endingButtonSequence;
