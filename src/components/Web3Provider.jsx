// eslint-disable-next-line no-unused-vars
import React from 'react';

import { WagmiProvider, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    appName: 'client',
    alchemyId:  import.meta.env.ALCHEMY_API_KEY,
    chains: [sepolia],
    walletConnectProjectId: import.meta.env.WALLETCONNECT_PROJECT_ID,
  })
);

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider debugMode customTheme={{
          "--ck-connectbutton-color" : "#fff",
          "--ck-connectbutton-background" : "rgba(94, 184, 121,0.9)",
          "--ck-connectbutton-hover-background" : "rgba(94, 184, 121,0.7)",
        }}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
