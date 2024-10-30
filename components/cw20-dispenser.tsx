"use client";

import { DISPERSE_ADDRESS } from "@/constants";


import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

import { useCw20BaseSendMutation } from "@/contracts/Cw20Base.react-query";
import { Input } from "./ui/input";
import { useWallet } from "@cosmos-kit/react";
import { Cw20BaseClient } from "@/contracts/Cw20Base.client";
import { CHAIN_NAME } from "@/config";

export const CW20Dispenser = () => {
  const [input, setInput] = useState("");
  const [cw20Address, setCw20Address] = useState("");
  const { mainWallet, status } = useWallet();


  const { mutateAsync: sendTokens } = useCw20BaseSendMutation();

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };



  const processInput = async () => {
    try {

      mainWallet?.connect();
      console.log(status);
      if (!mainWallet) {
        console.error("mainWallet is null");
        toast({
          title: "An error occurred",
          description: "Please connect to the wallet",
          variant: "destructive",
        });
        return;
      }

      const dorovotaWallet = mainWallet.getChainWallet(CHAIN_NAME);

      if (!dorovotaWallet) {
        console.error("dorovotaWallet is null");
        toast({
          title: "An error occurred",
          description: "Please connect to the wallet",
          variant: "destructive",
        });
        return;
      }

      await dorovotaWallet.connect();

      const dorovotaAddress = dorovotaWallet.address;

      if (!dorovotaAddress) {
        console.error("address is null");
        toast({
          title: "An error occurred",
          description: "Please connect to the wallet",
          variant: "destructive",
        });
        return;
      }

      const cosmWasmClient = await dorovotaWallet.getSigningCosmWasmClient();

      if (!cosmWasmClient) {
        console.error("cosmWasmClient is null");
        return;
      }

      if (cw20Address.length < 1) {
        throw new Error("Please enter a CW20 address");
        return;
      }

      console.log(cw20Address);

      const cw20Client = new Cw20BaseClient(
        cosmWasmClient,
        dorovotaAddress,
        cw20Address
      );

      const tokenInfo = await cw20Client.tokenInfo();

      const entries = input
        .split("\n")
        .filter((entry) => entry.trim() !== "")
        .map((entry) => entry.replace(/\s+/g, ""));

      let accumulator = BigNumber.from(0);

      const recipientMaths = entries.map((entry) => {
        const [address, amount] = entry.split(",");

        if (address.length !== 45 || address.startsWith("mantra1") === false) {
          throw new Error("Invalid address");
        }

        if (Number(amount) <= 0) {
          throw new Error("Invalid amount");
        }

        if (isNaN(Number(amount))) {
          throw new Error("Not a number");
        }

        const toReturnAmount = parseUnits(amount, tokenInfo.decimals);
        accumulator = accumulator.add(toReturnAmount);
        const toReturnAmountString = toReturnAmount.toString();
        return {
          address,
          amount: toReturnAmountString,
        };
      });

      const disperseMsg = {
        disperse: {
          recipients: recipientMaths,
        },
      };

      const msgBinary = Buffer.from(JSON.stringify(disperseMsg)).toString(
        "base64"
      );

      const tx = await sendTokens({
        client: cw20Client,
        msg: {
          contract: DISPERSE_ADDRESS,
          amount: accumulator.toString(),
          msg: msgBinary,
        },
        args: {
          fee: "auto",
          memo: `Disperse ${tokenInfo.symbol} to ${entries.length} ${
            entries.length === 1 ? "recipient" : "recipients"
          } with total amount of ${formatUnits(
            accumulator.toString(),
            tokenInfo.decimals
          )}`,
        },
      });

      toast({
        title: "Transaction sent",
        description: `Transaction hash: ${tx.transactionHash}`,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        toast({
          title: "An error occurred",
          description: err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "An error occurred",
          description: "Unknown error",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="input-cw20address"
          className="block text-sm font-medium text-gray-700"
        >
          CW20 Token Address
        </label>
        <Input
          className="w-full"
          onChange={(e) => {
            console.log("lol");
            setCw20Address(e.target.value);
          }}
        />
        <label
          htmlFor="input"
          className="block text-sm font-medium text-gray-700"
        >
          Enter addresses with amounts
        </label>
        <Textarea
          id="input"
          placeholder={`mantra1qhe8mmyztfhvxvnate7r6299vs0d0cykw9fly2, 5.2314 \nmantra1w7g8yvrsfvue8l9r6exz6j6paxz9m977v30a2f, 10.1341`}
          value={input}
          onChange={handleInputChange}
          className="min-h-[200px]"
        />
      </div>
      <Button onClick={processInput} className="w-full">
        Send CW20 Tokens
      </Button>
    </div>
  );
};
// Assume you have a DisperseCwClient instance
