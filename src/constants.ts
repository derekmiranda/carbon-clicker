import { ButtonKey } from "./types";

export const SECS_PER_DAY = 2;
export const GAME_VERSION = "C3C6D391-130C-4B39-9B41-3F0370E4D729";
export const LOG_LIMIT = 50;
export const STARTING_PPM = 425;
export const STARTING_PPM_RATE = 0.0067;
export const PHASE_1_KNOWLEDGE_GAIN = 1;
export const PHASE_2_KNOWLEDGE_GAIN = 3;
export const TIRED_MOOD_PERCENT = 0.5;
export const REAAAALLLYYY_TIRED_MOOD_PERCENT = 0.25;

export const DEFAULT_KNOWLEDGE_DROPPING = (num: number) =>
  `you gained +${num} knowledge!`;
export const LOG_BOUNDARY = `~~~~~~`;

export const END_PHASE_1 = [
  `you look into this question more: “what can individuals do to stop the climate crisis?`,
  `after some research, you learn that the most effective thing you can do is to take part in collective action.`,
  `you don’t really know what that means. you’ve never organized before! or marched in a rally! will it even make a difference?`,
  `you’re not sure, but the time for climate doom ‘n gloom is over. let’s try this out!!!`,
];

export const INTRO = [
  `welcome to summer 2024. it’s hot hot HOT outside!`,
  `you are a U.S. citizen and you are concerned about climate change. you know that it’s caused by humans and that it’s driving all these record-breaking heat waves and flooding around the world, including in your home. what do!`,
  `you’ve been told that living a more sustainable lifestyle can help. activities like biking, saving energy, and recycling will emit fewer greenhouse gas emissions (GHGs). that means less carbon dioxide in the atmosphere that traps heat and warms the planet. you want to do your part to help!`,
  `what can YOU do to lower the world’s carbon footprint?`,
];

export const END_PHASE_1_KNOWLEDGE_DROPPING = [
  LOG_BOUNDARY,
  ...END_PHASE_1,
  LOG_BOUNDARY,
];

export const WALLOW = [
  `"it’s been several months of living a more sustainable lifestyle, but you feel like your efforts are fruitless. global carbon emissions only continue to go up, and your actions feel like a drop in the bucket. what did you expect? you’re just one person.`,
  `even worse, you looked up the concept of a personal carbon footprint and learned that BP, aka british petroleum, played a huge role in marketing it to shift the responsibility of climate change onto individuals, not polluting corporations. you had no idea! how were you supposed to know? these companies have been doing everything they can to fuel climate denial and inaction for decades!!!`,
  `everything seems hopeless.`,
];

export const WALLOW_DROPPING = [LOG_BOUNDARY, ...WALLOW, LOG_BOUNDARY];
export const NEIGHBOR_DROPPING =
  "we've been taught to fear our neighbors, but actually, getting to know your community is climate action.";
export const VOTE_DROPPING =
  "electoral power has strong climate consequences, even at the local level.";
export const LEARNING_DROPPING = [
  `you learn about all the emotions that people experience with climate change: anxiety, grief, anger, guilt. you've definitely felt all of those. in fact, all this focus on living a "sustainable lifestyle" has enhanced your guilt. you'll never be perfect. the twinge of panic every time you buy a drink in plastic or turn on the AC can't be good for you.`,
  "there must be another way to help. but what?",
];

export const CHOOSE_PATHWAY = [
  `you're getting really good at building people power, knowledge, and trust. as you continue to take part in collective action, you see two paths laid out in front of you that are mutually exclusive.`,
  `which pathway will you take to destroy the fossil fuel industry?`,
];

export const KNOWLEDGE_DROPPINGS = [
  `you learned that 20% of carbon emissions in the US come from cars. crazy!`,
  `did you know that factory farming of cattle is the #1 source of agricultural emissions in the world? and cows are so cute!`,
  `congrats, you found a job! now you can participate in capitalism and earn that sweet sweet $$$`,
  `you're reading "silent spring" by rachel carson. what a quintessential environmental book!`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN),
  `you found the "trash is for tossers" blog from lauren singer. #lifegoals, am i right?`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN),
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN),
  `you're reading "this changes everything" by naomi klein. this climate change issue is much bigger than you thought.`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN),
  `you're reading "parable of the sower" by octavia butler. is this where our future is headed?`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN),
  WALLOW_DROPPING,
  `${DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN)} but you're still sad.`,
  LEARNING_DROPPING,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_1_KNOWLEDGE_GAIN),
  END_PHASE_1_KNOWLEDGE_DROPPING,
  "you're gaining knowledge at a faster rate now that you're in a collective!",
  NEIGHBOR_DROPPING,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_2_KNOWLEDGE_GAIN),
  VOTE_DROPPING,
];

export const END_GAME_KNOWLEDGE_DROPPINGS = [
  `you're reading "all we can save" by dr. ayana elizabeth johnson and dr. katharine wilkinson. you're starting to feel more in touch with nature again, and all the hope and love that comes with a healthy planet.`,
  `you're reading "a psalm for the wild built" by becky chambers. a better world is possible, and you are just one of the many humans building it.`,
];

export const REVOLUTION_KNOWLEDGE_DROPPINGS = [
  `you're reading "how to blow up a pipeline" by andreas malm. peaceful protest is no longer sufficient; we need action that screams we've had enough with rich polluters.`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_2_KNOWLEDGE_GAIN),
  `you're reading "everything for everyone" by m.e. o'brien and eman abdelhadi. our future relies on communities taking care of each other.`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_2_KNOWLEDGE_GAIN),
  ...END_GAME_KNOWLEDGE_DROPPINGS,
];

export const COOPERATION_KNOWLEDGE_DROPPINGS = [
  `you're reading "drawdown" by paul hawken. so many carbon reduction solutions to carry out -- but is there enough time to do it all?`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_2_KNOWLEDGE_GAIN),
  `you're reading "ministry for the future" by kim stanley robinson. the governments of the world have to band together to win this fight.`,
  DEFAULT_KNOWLEDGE_DROPPING(PHASE_2_KNOWLEDGE_GAIN),
  ...END_GAME_KNOWLEDGE_DROPPINGS,
];

export const REVOLUTION_EPILOGUE = [
  `through the power of a revolution, you and your group destroy the fossil fuel industry.`,
  `it wasn't easy. your group's radical actions polarized people, and after the dismantling of governments, there's a lot of rebuilding work you'll have to do.`,
  `but change is never easy.`,
  `the revolution brought about a sense of trust. people stopped turning to authorities and started turning to you, to each other. you built people power effectively this way, and have now developed a populace that can govern itself.`,
];

export const COOPERATION_EPILOGUE = [
  `through the power of cooperation, you and your group destroy the fossil fuel industry.`,
  `it wasn't easy. your group's endless coordination with governments was often tiring, and you lost some trust with the public for working with authorities.`,
  `but change is never easy.`,
  `the collaboration brought a renewed sense of unity amongst humanity. great minds and organizations came together to create fantastic innovations, progressing human knowledge further than anyone would have ever thought.`,
];

export const REMAINING_EPILOGUE_CONTENT = [
  [
    `more than that, you've given people hope. the earth is not doomed. you've learned from each other that through collective action, there is a way to survive. to thrive.`,
    `humanity is not a virus. we were once stewards of this land. we can return to that.`,
  ],
  `but right now, you're just tired. so it's time to...`,
];

export const EPILOGUE_BUTTON_ORDER = [
  ButtonKey.bikeInsteadOfDrive,
  ButtonKey.cookVegMeal,
  ButtonKey.turnOffLights,
];
export const EPILOGUE_BUTTON_LOGS = {
  [ButtonKey.bikeInsteadOfDrive]: `after a long day of celebrating, grieving, reflecting -- you bike home. the air feels clean and the temperature is just right.`,
  [ButtonKey.cookVegMeal]: `you take care of yourself with a comforting meal. a sense of weariness descends upon you. you are content and ready to rest.`,
  [ButtonKey.turnOffLights]: `the sun sets on the world you have helped create. you turn off the lights.`,
};

const getSelfEducateThreshold = (targetDrop: string | string[]) =>
  KNOWLEDGE_DROPPINGS.findIndex((drop) => drop === targetDrop) + 1;

export const SELF_EDUCATE_THRESHOLDS = {
  WALLOW: getSelfEducateThreshold(WALLOW_DROPPING),
  PHASE_TWO: getSelfEducateThreshold(END_PHASE_1_KNOWLEDGE_DROPPING),
  NEIGHBOR: getSelfEducateThreshold(NEIGHBOR_DROPPING),
  LEARNING: getSelfEducateThreshold(LEARNING_DROPPING),
  VOTE: getSelfEducateThreshold(VOTE_DROPPING),
  CHOOSE_PATHWAY: getSelfEducateThreshold(CHOOSE_PATHWAY),
};

export const MAX_MOOD = 200;
export const DISPLAY_NAMES: Record<string, string> = {
  knowledge: "Knowledge",
  mood: "Mood",
  dollars: "$",
  collectiveDollars: "$ (collective)",
  co2Saved: "CO2 Saved",
  globalPpm: "Global PPM",
  peoplePower: "People Power",
  trust: "Trust",
};

export const RESOURCE_EMOJIS: Record<string, string> = {
  knowledge: "📖",
  mood: "🌼",
  dollars: "$",
  collectiveDollars: "$$",
  globalPpm: "🌍",
  co2Saved: "💨",
  peoplePower: "👥",
  trust: "🫶",
};

export const SHORTCUTS = [`esc: pause game / close popup`, `m: mute sound`];
