"use client";
import { wallets, type SignerOptions } from "cosmos-kit";
import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chain } from "@chain-registry/types";

import { GasPrice, SigningStargateClientOptions } from "@cosmjs/stargate";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";

const signerOptions: SignerOptions = {
  // signingStargate: () => {
  //   return getSigningCosmosClientOptions();
  // }

  signingCosmwasm: (chain) => {
    if (typeof chain === "string") {
      const lol = {
        gasPrice: GasPrice.fromString("0.0002uom"),
      };

      return lol;
    }

    switch (chain.chain_name) {
      case "mantrachaintestnet":
        return {
          gasPrice: GasPrice.fromString("0.0002uom"),
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

  // ChainProvider uses a different type so we convert it here

  const compatibleChains = chains as (string | Chain)[];

  return (
    <QueryClientProvider client={queryClient}>
      <ChainProvider
        chains={compatibleChains} // supported chains
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
