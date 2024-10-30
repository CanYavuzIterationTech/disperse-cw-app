"use client";
import { CHAIN_NAME } from "@/config";
import { DisperseCwClient } from "@/contracts/DisperseCw.client";
import { useWallet } from "@cosmos-kit/react";
import { useEffect, useState } from "react";


export function useDisperseCwClient(contractAddress: string) {
  // offline signer
  const { mainWallet, status } = useWallet();
  const [disperseCwClient, setDisperseCwClient] = useState<DisperseCwClient | null>(
    null
  );



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

      const cosmWasmClient = await dorovotaWallet.getSigningCosmWasmClient();

      if (!cosmWasmClient) {
        console.error("cosmWasmClient is null");
        return;
      }

      const newClient = new DisperseCwClient(
        cosmWasmClient,
        dorovotaAddress,
        contractAddress
      );

      setDisperseCwClient(newClient);
    }

    blud();


  }, [mainWallet, contractAddress, status]);

  // cw20 client

  // query and return token balance

  return disperseCwClient ?? undefined;
}
