import { getSiteUrl } from "./lib/siteUrl";

const ROOT_URL = getSiteUrl();

export const farcasterConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "Medieval Donkey Tap",
    subtitle: "Tap the Donkey",
    description:
      "Tap the stubborn donkey, perform onchain check-ins every 2 minutes, and climb the medieval leaderboard on Base.",
    imageUrl: `${ROOT_URL}/donkey.svg`,
    buttonTitle: "Tap the Donkey",
    screenshotUrls: [`${ROOT_URL}/donkey.svg`],
    iconUrl: `${ROOT_URL}/donkey.svg`,
    splashImageUrl: `${ROOT_URL}/donkey.svg`,
    splashBackgroundColor: "#2c1810",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["game", "tap", "medieval", "leaderboard", "onchain", "base"],
    heroImageUrl: `${ROOT_URL}/donkey.svg`,
    tagline: "Tap. Check in. Rule the realm.",
    ogTitle: "Medieval Donkey Tap",
    ogDescription: "Medieval tap game for Base App.",
    ogImageUrl: `${ROOT_URL}/donkey.svg`,
    castShareUrl: ROOT_URL,
  },
} as const;
