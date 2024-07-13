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
  "start a mutual aid fund": { clicked: "sharing is caring!" },
  "organize your community": {
    clicked: "it takes a village to do... well, anything",
  },

  vote: { clicked: "time to show off my cool sticker" },
  "go to a city council meeting": {
    clicked:
      "we only get 2 minutes to speak, so i've been practicing distilling my climate anxietiy and hope into an elevator pitch",
  },
  "volunteer for a local politician's campaign": {
    clicked: `time to canvass! "hi there, have a minute to learn how you can address climate change at the local level?"`,
  },

  "direct action": {
    clicked: [
      `fancy dinner you're having, exxon mobil. would be a shame if someone... disrupted it ;) `,
      `citibank is part of this parade? time to bring it to a halt!`,
      `did the president just approve more drilling? oh hell no. RALLY NOW`,
      `tsk tsk blackrock, greenwashing again. don't be surprised about the protest outside your office.`,
      `there's nothing like marching with a crowd and shouting "WE ARE UNSTOPPABLE, ANOTHER WORLD IS POSSIBLE"`,
    ],
  },

  "community care": {
    clicked: [
      `nothing like a good ol' fashioned community cookout. everyone gets to eat, no matter how much they can contribute`,
      `someone just had a baby! time to organize volunteer childcare shifts. it really does take a village.`,
      `another season, another clothing drive. i'm gonna swap in stuff i've outgrown and pick up some cute new fits.`,
      `we put on a talent show to fundraise for the kids going to college. they grow up so fast :')`,
      `someone lost their home. thanks to the collective fund, we're all able to help them find a new place where they can get back on their feet."`,
    ],
  },

  "political action": {
    clicked: [
      `nothing like a good ol' fashioned community cookout. everyone gets to eat, no matter how much they can contribute`,
      `someone just had a baby! time to organize volunteer childcare shifts. it really does take a village.`,
      `another season, another clothing drive. i'm gonna swap in stuff i've outgrown and pick up some cute new fits.`,
      `we put on a talent show to fundraise for the kids going to college. they grow up so fast :')`,
      `someone lost their home. thanks to the collective fund, we're all able to help them find a new place where they can get back on their feet."`,
    ],
  },

  "blow up a pipeline": {
    clicked: `BOOM! that's the last thing you'll be combusting!`,
  },
  "intimidate a bank into divestment from fossil fuels": {
    clicked: `if we stop the money pipeline, we can stop the oil pipeline. toodles, jpmorgan chase!`,
  },
  "take over a city government": {
    clicked: `we have no mayor. if the people can run our own city, what else can we do?`,
  },

  "fill city council with climate justice champions": {
    clicked: `meaningful climate action begins at the local level`,
  },
  "pass a package of climate action bills": {
    clicked: `nerdy? maybe. effective? oh yes, very much so.`,
  },
  "speak at the next conference of parties (COP)": {
    clicked: `we're not leaving these negotiations until world leaders agree to STOP BIG OIL`,
  },
};

export default buttonLogs;
