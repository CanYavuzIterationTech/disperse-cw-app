"use client";
import { wallets, type SignerOptions } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import {
  chains as defaultChains,
  assets as defaultAssets,
} from "chain-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GasPrice, SigningStargateClientOptions } from "@cosmjs/stargate";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
import { CHAIN_NAME } from "@/config";
import { myCustomAssets } from "@/config/custom-assets";
import { mantraDukongChain } from "@/config/custom-chain";

const signerOptions: SignerOptions = {
  // signingStargate: () => {
  //   return getSigningCosmosClientOptions();
  // }

  signingCosmwasm: (chain) => {
    console.log("here");
    if (typeof chain === "string") {
      const lol = {
        gasPrice: GasPrice.fromString("0.03uom"),
      };

      return lol;
    }

    switch (chain.chain_name) {
      case CHAIN_NAME:
        return {
          gasPrice: GasPrice.fromString("0.03uom"),
        } satisfies SigningStargateClientOptions;
    }
  },
};

export default function Wrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const allowedWallets = wallets.filter(
    (wallet) =>
      wallet.walletName === "keplr-extension" ||
      wallet.walletName === "leap-extension"
  );
  const queryClient = new QueryClient();

  const chains = [...defaultChains, mantraDukongChain];
  const assets = [...defaultAssets, ...myCustomAssets];

  return (
    <QueryClientProvider client={queryClient}>
      <ChainProvider
        //@ts-expect-error: Retarded shit won't shut the fuck up
        chains={chains} // supported chains
        //@ts-expect-error: Retarded shit won't shut the fuck up
        assetLists={assets} // supported asset lists
        wallets={allowedWallets} // supported wallets
        walletConnectOptions={{
          signClient: {
            projectId: "a8510432ebb71e6948cfd6cde54b70f7",
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "CosmosKit Template",
              description: "CosmosKit dapp template",
              url: "https://docs.cosmology.zone/cosmos-kit/",
              icons: [],
            },
          },
        }}
        signerOptions={signerOptions}
      >
        {children}
        <Toaster />
      </ChainProvider>
    </QueryClientProvider>
  );
}
