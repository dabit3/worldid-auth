'use client'
import { WagmiProvider, createConfig } from "wagmi";
import { ConnectKitProvider as Provider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    appName: "WorldCoin ID Connect",
  }),
);

const queryClient = new QueryClient();

export const ConnectKitProvider = ({ children }: { children: any }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider>
          {children }
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};