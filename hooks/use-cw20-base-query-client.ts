"use client";
import { CHAIN_NAME } from "@/config";
import { Cw20BaseQueryClient } from "@/contracts/Cw20Base.client";
import { useWallet } from "@cosmos-kit/react";

import { useEffect, useState } from "react";

export function useCw20BaseQueryClient(contractAddress: string) {
  const { mainWallet, status } = useWallet();
  const [cw20BaseClient, setCw20BaseClient] =
    useState<Cw20BaseQueryClient | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  console.log("useCW20QueryClient", mainWallet, status);

  useEffect(() => {
    async function blud() {
      if (!mainWallet) {
        console.error("mainWallet is null");
        return;
      }

      const dorovotaWallet = mainWallet.getChainWallet(CHAIN_NAME);

      if (!dorovotaWallet) {
        console.error("dorovotaWallet is null");
        return;
      }
      await dorovotaWallet.connect();

      const dorovotaAddress = dorovotaWallet.address;

      if (!dorovotaAddress) {
        console.error("address is null");
        return;
      }

      setUserAddress(dorovotaAddress);

      const cosmWasmClient = await dorovotaWallet.getSigningCosmWasmClient();
      if (!cosmWasmClient) {
        console.error("cosmWasmClient is null");
      }

      const newClient = new Cw20BaseQueryClient(
        cosmWasmClient,
        contractAddress
      );

      setCw20BaseClient(newClient);
    }

    blud();


  }, [mainWallet, contractAddress, status]);

  // cw20 client

  // query and return token balance

  return {
    cw20BaseClient: cw20BaseClient ?? undefined,
    userAddress: userAddress ?? undefined,
  };
}
