import { base } from "wagmi/chains";
import { createConfig, createStorage, cookieStorage, http } from "wagmi";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { baseAccount, injected, walletConnect } from "wagmi/connectors";
import { APP_DISPLAY_NAME, WALLETCONNECT_PROJECT_ID } from "@/lib/appConfig";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

/** Base App / Farcaster mini app — embedded wallet only. */
export const miniAppWagmiConfig = createConfig({
  chains: [base],
  connectors: [farcasterMiniApp()],
  transports: { [base.id]: http() },
});

/** Browser — Rabby, MetaMask, WalletConnect, Base smart wallet. */
export const webWagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({ target: "rabby" }),
    injected({ target: "metaMask" }),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: true,
      metadata: {
        name: APP_DISPLAY_NAME,
        description: APP_DISPLAY_NAME,
        url: siteUrl,
        icons: [`${siteUrl}/donkey.svg`],
      },
    }),
    baseAccount({
      appName: APP_DISPLAY_NAME,
    }),
  ],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  transports: { [base.id]: http() },
});
