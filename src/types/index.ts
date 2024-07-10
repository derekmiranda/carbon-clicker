// values correspond to reducer keys
export enum ResourceTypes {
  GLOBAL_PPM = "globalPpm",
  CO2_SAVED = "co2Saved",
  DOLLARS = "dollars",
  MOOD = "mood",
  KNOWLEDGE = "knowledge",
  PEOPLE_POWER = "peoplePower",
  COLLECTIVE_DOLLARS = "collectiveDollars",
  TRUST = "trust",
}

export const ResourceList = Object.values(ResourceTypes);

export type Resources = {
  mood: number;
  maxMood: number;
  dollars: number;
  co2Saved: number;
  knowledge: number;
  globalPpm: number;

  // phase 2
  collectiveDollars: number;
  peoplePower: number;
  trust: number;
};

export enum ButtonKey {
  null = "null",
  destroyFossilFuelIndustry = "destroy the fossil fuel industry",
  selfEducate = "selfEducate",
  turnOffLights = "turn off the lights",
  makeHomeEnergyEfficient = "make home energy efficient",
  buySolarPanels = "buy solar panels",
  bikeInsteadOfDrive = "bike instead of drive",
  driveEV = "drive EV",
  buyEV = "buy electric vehicle",
  cookVegMeal = "cook a vegetarian meal",
  homegrownMeal = "cook meal with homegrown produce",
  startYourOwnGarden = "start your own garden",
  job = "job",
  wallowInMisery = "wallow in misery",

  // phase 2
  takeABreak = "take a break",
  attendRally = "attend a rally",
  joinClimateOrg = "join a climate org",
  formClimateCoalition = "form a climate coalition",
  talkToNeighbor = "talk to your neighbor",
  startMutualAidFund = "start a mutual aid fund",
  organizeCommunity = "organize your community",
  vote = "vote",
  cityCouncilMeeting = "go to a city council meeting",
  volunteer = "volunteer for a local politician's campaign",

  directAction = "direct action",
  communityCare = "community care",
  politicalAction = "political action",

  revolution = "revolution",
  blowUpPipeline = "blow up a pipeline",
  intimidateBank = "intimidate a bank into divestment from fossil fuels",
  takeOver = "take over a city government",

  cooperation = "cooperation",
  fillCityCouncil = "fill city council with climate justice champions",
  passBills = "pass a package of climate action bills",
  speakAtCOP = "speak at the next conference of parties (COP)",
}

export type ButtonKeyMap<T> = { [key in ButtonKey]?: T };

export interface Cost extends Partial<Resources> {
  noDeduct?: boolean;
}

export interface Requirements {
  resources?: Partial<Resources>;
  // array of ids for buttons to unlock
  buttonsUnlocked?: ButtonKey[];
  // array of ids for story scenes to unlock
  storyIdsUnlocked?: string[];
  // required button presses
  timesButtonsPressed?: ButtonKeyMap<number>;
  phase?: GamePhase;
  pathway?: Pathway;
}

export enum EffectTypes {
  UPDATE_RESOURCES = "UPDATE_RESOURCES",
  UPDATE_RESOURCES_RATE = "UPDATE_RESOURCES_RATE",
  UNLOCK_BONUS = "UNLOCK_BONUS",
  UNLOCK_STORY_FLAG = "UNLOCK_STORY_FLAG",
}

export interface GenericEffect {
  type: EffectTypes;
}

export interface UpdateResourcesEffect {
  type: EffectTypes.UPDATE_RESOURCES;
  resourcesDiff: Partial<Resources>;
  proportionalDiffs?: { [key in ResourceTypes]?: true };
}

export interface UpdateResourcesRateEffect {
  type: EffectTypes.UPDATE_RESOURCES_RATE;
  resourcesRateDiff: Partial<Resources>;
  proportionalDiffs?: { [key in ResourceTypes]?: true };
}

export type Effect =
  | UpdateResourcesEffect
  | UpdateResourcesRateEffect
  | GenericEffect;

export interface MapLikeInterface<T, K extends string = string> {
  map: { [key in K]?: T };
  order: string[];
}

export enum ModalView {
  INTRO = "INTRO",
  WALLOW = "WALLOW",
  END_PHASE_ONE = "END_PHASE_ONE",
  CHOOSE_PATHWAY = "CHOOSE_PATHWAY",
  PPM_EVENT = "PPM_EVENT",
}

export interface ModalViewProps {
  content?: string;
}

export enum GamePhase {
  ONE,
  TWO,
}

export enum Pathway {
  COOPERATION = "cooperation",
  REVOLUTION = "revolution",
}
