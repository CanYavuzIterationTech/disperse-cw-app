"use client";
import { Cw20BaseClient } from "@/contracts/Cw20Base.client";
import { useWallet } from "@cosmos-kit/react";
import { useEffect, useState } from "react";

export function useCw20BaseClient(contractAddress: string) {
  // offline signer
  const { mainWallet, status } = useWallet();
  const [cw20BaseClient, setCw20BaseClient] = useState<Cw20BaseClient | null>(
    null
  );

  useEffect(() => {
    async function blud() {
      if (!mainWallet) {
        console.error("mainWallet is null");
        return;
      }

      const dorovotaWallet = mainWallet.getChainWallet("mantrachaintestnet");

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

      const cosmWasmClient = await dorovotaWallet.getSigningCosmWasmClient();

      if (!cosmWasmClient) {
        console.error("cosmWasmClient is null");
        return;
      }

      const newClient = new Cw20BaseClient(
        cosmWasmClient,
        dorovotaAddress,
        contractAddress
      );

      setCw20BaseClient(newClient);
    }

    blud();


  }, [mainWallet, contractAddress, status]);

  // cw20 client

  // query and return token balance

  return cw20BaseClient ?? undefined;
}
