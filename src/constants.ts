export const GAME_VERSION = "0";

export const DEFAULT_KNOWLEDGE_DROPPING = `you gained +1 knowledge!`;
export const LOG_BOUNDARY = `~~~~~~`;

export const END_PHASE_1 = [
  `you look into this question more: “what can individuals do to stop the climate crisis?`,
  `after some research, you learn that the most effective thing you can do is to take part in collective action.`,
  `you don’t really know what that means. you’ve never organized before! or marched in a rally! will it even make a difference?`,
  `you’re not sure, but the time for climate doom ‘n gloom is over. let’s try this out!!!`,
];

export const END_PROTOTYPE = [
  `that's the end of the prototype!`,
  `in the next part of the game, we'll introduce collective action, where you can team together with a larger community of climate-minded folks like yourself!`,
  `you'll be able to choose different paths, such as taking either a cooperative approach or starting a revolution!`,
  `stay tuned!`,
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

export const KNOWLEDGE_DROPPINGS = [
  `you learned that 20% of carbon emissions in the US come from cars. crazy!`,
  `did you know that cattle are the #1 source of agricultural emissions in the world? and they're so cute!`,
  `congrats, you found a job! now you can participate in capitalism and earn that sweet sweet $$$`,
  `you're reading "silent spring" by rachel carson. what a quintessential environmental book!`,
  "What's this? The 'carbon footprint' was invented by fossil fuel companies?!",
  DEFAULT_KNOWLEDGE_DROPPING,
  `you found the "trash is for tossers" blog from lauren singer. #lifegoals, am i right?`,
  DEFAULT_KNOWLEDGE_DROPPING,
  `you're reading "this changes everything" by naomi klein. this climate change issue is much bigger than you thought.`,
  DEFAULT_KNOWLEDGE_DROPPING,
  `you're reading "parable of the sower" by octavia butler. is this where our future is headed?`,
  [
    LOG_BOUNDARY,
    `"it’s been several months of living a more sustainable lifestyle, but you feel like your efforts are fruitless. global carbon emissions only continue to go up, and your actions feel like a drop in the bucket. what did you expect? you’re just one person.`,
    `even worse, you looked up the concept of a personal carbon footprint and learned that BP, aka british petroleum, played a huge role in marketing it to shift the responsibility of climate change onto individuals, not polluting corporations. you had no idea! how were you supposed to know? these companies have been doing everything they can to fuel climate denial and inaction for decades!!!`,
    `everything seems hopeless.`,
    LOG_BOUNDARY,
  ],
  END_PHASE_1_KNOWLEDGE_DROPPING,
];

export const SECS_PER_DAY = 2;
export const MAX_MOOD = 200;
export const DISPLAY_NAMES: Record<string, string> = {
  knowledge: "Knowledge",
  mood: "Mood",
  dollars: "$",
  co2Saved: "CO2 Saved",
};
