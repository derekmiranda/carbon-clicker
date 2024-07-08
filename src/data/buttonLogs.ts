import { ButtonKeyMap } from "../types";

export interface LogValues {
  clicked?: string | string[];
  unlocked?: string | string[];
}

const buttonLogs: ButtonKeyMap<LogValues> = {
  "turn off the lights": {
    clicked: "climate action is as easy as the flick of a switch!",
  },
  "make home energy efficient": {
    unlocked: "i can upgrade my home to save money? say less!",
  },
  "buy solar panels": {
    clicked:
      "i can generate energy for myself AND sell some back to the grid? we love to see it",
  },
  "bike instead of drive": { clicked: "tone those calves!" },
  "buy electric vehicle": {
    unlocked: "when unlocked: those smooth, silent cars are sexy",
  },
  "drive EV": {
    clicked: "buzz buzz (i think that's the EV equivalent of vroom vroom)",
  },
  "cook a vegetarian meal": { clicked: "veggies, yum" },
  "start your own garden": {
    unlocked: "i want more green in my life",
    clicked: "i can't wait for native pollinators to visit!",
  },
  "cook meal with homegrown produce": {
    clicked: "food always tastes better when you grow it yourself",
  },
  job: {
    clicked: [
      "spreadsheets are fun",
      "oh boy do i love serving customers",
      "i feel fulfilled when i increase my CEO's profit margins",
      "i am not stressed out at all",
      "i enjoy having my value determined by my productivity",
    ],
  },
  "wallow in misery": {
    clicked: [
      "everything is hopeless",
      "the world is on fire",
      "maybe moving to mars is a good idea",
      "at least i have my cat",
      "what's the point in trying?",
    ],
  },
  "take a break": {
    clicked: [
      "in a burning world, we can't burn out",
      "rest is radical",
      "self-care is community care",
      "remember to breathe",
      "my value is NOT determined by my productivity!!",
    ],
  },
  "attend a rally": {
    clicked: "there's so much great energy and you meet a lot of cool people!",
  },
  "join a climate org": {
    clicked:
      "it's the first time you've met so many people who are just as angry and scared as you -- and also just as hopeful",
  },
  "form a climate coalition": {
    clicked:
      "only people power can tackle the massive wealth and influence of corporations!",
  },
  "talk to your neighbor": { clicked: "i'm just a regular mr. rogers" },
};

export default buttonLogs;
