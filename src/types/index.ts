// values correspond to reducer keys
export enum ResourceTypes {
  GLOBAL_PPM = "globalPpm",
  CO2_SAVED = "co2Saved",
  DOLLARS = "dollars",
  ENERGY = "energy",
  KNOWLEDGE = "knowledge",
}

export const ResourceList = Object.values(ResourceTypes);

export type Resources = {
  energy: number;
  maxEnergy: number;
  dollars: number;
  co2Saved: number;
  knowledge: number;
  globalPpm: number;
  globalPpmPerMonth: number;
};

export type Cost = Resources;

export interface Requirements {
  resources?: Partial<Resources>;
  // array of ids for bonuses to unlock
  bonusesUnlocked?: string[];
  // array of ids for story scenes to unlock
  storyIdsUnlocked?: string[];
  // required button presses
  timesButtonsPressed?: Record<string, number>;
}

export enum EffectTypes {
  UPDATE_RESOURCES = "UPDATE_RESOURCES",
  UNLOCK_BONUS = "UNLOCK_BONUS",
  UNLOCK_STORY_FLAG = "UNLOCK_STORY_FLAG",
}

export interface GenericEffect {
  type: EffectTypes;
  [key: string]: unknown;
}

export interface UpdateResourcesEffect {
  type: EffectTypes.UPDATE_RESOURCES;
  resourcesDiff: Resources;
}

export type Effect = UpdateResourcesEffect | GenericEffect;

export interface MapLikeInterface<T> {
  map: Record<string, T>;
  order: string[];
}

export enum ModalView {
  INTRO = "INTRO",
}
