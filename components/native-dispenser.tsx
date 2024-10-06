"use client";

import { useDisperseCwDisperseNativeMutation } from "@/contracts/DisperseCw.react-query";
import { DISPERSE_ADDRESS } from "@/constants";
import { Coin } from "@cosmjs/amino";
import { useDisperseCwClient } from "@/hooks/use-disperse-cw-client";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

export const NativeDispenser = () => {
  const disperseClient = useDisperseCwClient(DISPERSE_ADDRESS);
  const [input, setInput] = useState("");

  const { mutateAsync: disperseNative } = useDisperseCwDisperseNativeMutation();

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const processInput = async () => {
    try {
      if (!disperseClient) {
        console.error("disperseClient is null");
        toast({
          title: "An error occurred",
          description: "Please connect to the wallet",
          variant: "destructive",
        });

        return;
      }

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

        const toReturnAmount = parseUnits(amount, 6);
        accumulator = accumulator.add(toReturnAmount);
        const toReturnAmountString = toReturnAmount.toString();
        return {
          address,
          amount: [{ denom: "uom", amount: toReturnAmountString }],
        };
      });

      const totalAmount: Coin[] = [
        { denom: "uom", amount: accumulator.toString() },
      ];

      const tx = await disperseNative({
        client: disperseClient,
        msg: { recipients: recipientMaths },
        args: {
          fee: "auto",
          memo: `Disperse OM to ${entries.length} ${
            entries.length === 1 ? "recipient" : "recipients"
          } with total amount of ${formatUnits(accumulator, 6)}`,
          funds: totalAmount, // Send the total amount as funds
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
        Send Native Tokens
      </Button>
    </div>
  );
};
// Assume you have a DisperseCwClient instance
