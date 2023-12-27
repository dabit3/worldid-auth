'use client'
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider as Provider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    appName: "WorldCoin ID Connect",
  }),
);

export const ConnectKitProvider = ({ children }: { children: any }) => {
  return (
    <WagmiConfig config={config}>
      <Provider>
        {children }
      </Provider>
    </WagmiConfig>
  );
};