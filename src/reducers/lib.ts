import { STARTING_PPM_RATE } from "../constants";
import {
  ButtonKey,
  EffectTypes,
  GenericEffect,
  MapLikeInterface,
  Resources,
  ResourceTypes,
  UpdateResourcesEffect,
  UpdateResourcesRateEffect,
} from "../types";
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
    pathway: newState.pathway,
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

export function getUpdatedResources(
  state: ClickerInterface,
  effect: UpdateResourcesEffect
) {
  const { resourcesDiff, proportionalDiffs } = effect;

  const newResources = { ...state.resources };
  for (const item of Object.entries(resourcesDiff)) {
    const [key, diff] = item as [keyof Resources, number];

    const newResource = proportionalDiffs?.[key as ResourceTypes]
      ? state.resources[key] * (1 + diff)
      : Math.max(state.resources[key] + diff, 0);
    newResources[key] = newResource;

    if (key === ResourceTypes.MOOD) {
      newResources.mood = Math.min(newResources.mood, state.resources.maxMood);
    } else if (key === ResourceTypes.TRUST) {
      newResources.trust = Math.min(newResources.trust, 100);
    }
  }

  return newResources;
}

export function processEffects(
  newState: ClickerInterface,
  effects: GenericEffect[]
) {
  for (const effect of effects) {
    switch (effect.type) {
      case EffectTypes.UPDATE_RESOURCES: {
        const newResources = getUpdatedResources(
          newState,
          effect as UpdateResourcesEffect
        );

        newState.resources = newResources;
        break;
      }

      case EffectTypes.UPDATE_RESOURCES_RATE: {
        const { resourcesRateDiff } = effect as UpdateResourcesRateEffect;
        const newGrowthRates = { ...newState.resourceGrowthRates };

        for (const item of Object.entries(resourcesRateDiff)) {
          const [key, diff] = item as [keyof Resources, number];

          if (key === "globalPpm") {
            newGrowthRates.globalPpm =
              (newGrowthRates.globalPpm ?? STARTING_PPM_RATE) * (1 + diff);
          } else if (typeof newGrowthRates[key] === "number") {
            (newGrowthRates[key] as number) += diff;
          } else {
            newGrowthRates[key] = diff;
          }
        }

        newState.resourceGrowthRates = newGrowthRates;
        break;
      }
    }
  }
}

export function isResourceMet(
  resourceKey: string,
  neededResources: Partial<Resources>,
  currResources: Resources
) {
  const reqResource = neededResources[resourceKey as ResourceTypes];
  const currResource =
    resourceKey === ResourceTypes.COLLECTIVE_DOLLARS
      ? currResources[ResourceTypes.COLLECTIVE_DOLLARS] +
        currResources[ResourceTypes.DOLLARS]
      : currResources[resourceKey as ResourceTypes];
  return !reqResource || reqResource <= currResource;
}

export function checkResourcesMet(
  neededResources: Partial<Resources>,
  currResources: Resources
) {
  return Object.keys(neededResources).every((resourceKey) =>
    isResourceMet(resourceKey, neededResources, currResources)
  );
}
