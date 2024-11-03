"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CW20Dispenser } from "@/components/cw20-dispenser";
import { NativeDispenser } from "@/components/native-dispenser";
import { useState } from "react";
import { useDisperseCwClient } from "@/hooks/use-disperse-cw-client";
import { DISPERSE_ADDRESS } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { Coin } from "@cosmjs/amino";
import { useDisperseCwDisperseNativeMutation } from "@/contracts/DisperseCw.react-query";
import { useCw20BaseSendMutation } from "@/contracts/Cw20Base.react-query";
import { useWallet } from "@cosmos-kit/react";
import { CHAIN_NAME } from "@/config";
import { Cw20BaseClient } from "@/contracts/Cw20Base.client";

export const DispenserTabs = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl">Dispenser Test App</h1>

      <div className="w-full flex justify-center items-center">
        <Tabs defaultValue="native" className="w-full max-w-2xl">
          <TabsList className="w-full">
            <TabsTrigger value="native" className="w-full">
              Native
            </TabsTrigger>
            <TabsTrigger value="cw20" className="w-full">
              CW20
            </TabsTrigger>
          </TabsList>
          <TabsContent value="native">
            <NativeDispenser />
          </TabsContent>
          <TabsContent value="cw20">
            <CW20Dispenser />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export const Fuck = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("native");
  const [cw20Address, setCw20Address] = useState("");
  const disperseClient = useDisperseCwClient(DISPERSE_ADDRESS);
  const { mutateAsync: disperseNative } = useDisperseCwDisperseNativeMutation();
  const { mutateAsync: sendTokens } = useCw20BaseSendMutation();
  const { mainWallet, status } = useWallet();

  const colors = {
    sun: "#F8B994",
    pink: "#FF97D6",
    dark: "#201E1D",
  };
  const { toast } = useToast();

  const processNativeInput = async () => {
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
  const processCw20Input = async () => {
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
    <div style={{ borderColor: colors.sun }} className="border rounded-xl p-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {[
          {
            id: "native",
            label: "Native $OM",
            desc: "Distribute MANTRA Chain native token",
          },
          {
            id: "cw20",
            label: "CW20 Tokens",
            desc: "Distribute any CW20 token using its contract address",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor:
                activeTab === tab.id ? colors.sun : "transparent",
              borderColor: colors.sun,
            }}
            className="flex-1 p-4 rounded-lg border-2 transition-all"
          >
            <div
              style={{ color: activeTab === tab.id ? colors.dark : colors.sun }}
              className="font-medium mb-1"
            >
              {tab.label}
            </div>
            <div
              style={{
                color: activeTab === tab.id ? colors.dark : colors.pink,
              }}
              className="text-xs"
            >
              {tab.desc}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === "cw20" && (
          <div>
            <label
              style={{ color: colors.sun }}
              className="block mb-2 text-sm font-medium"
            >
              CW20 Token Contract Address
            </label>
            <input
              style={{
                backgroundColor: colors.dark,
                borderColor: colors.pink,
                color: colors.pink,
              }}
              className="w-full p-4 border-2 rounded-lg font-mono text-sm"
              placeholder="Enter any CW20 token contract address to distribute"
              value={cw20Address}
              onChange={(e) => setCw20Address(e.target.value)}
            />
            <div style={{ color: colors.pink }} className="mt-2 text-xs">
              Compatible with all CW20 tokens on MANTRA Chain • Contract code
              verified on-chain
            </div>
          </div>
        )}

        <div>
          <label
            style={{ color: colors.sun }}
            className="block mb-2 text-sm font-medium"
          >
            Batch Distribution List
          </label>
          <div style={{ color: colors.pink }} className="text-xs mb-2">
            Enter multiple recipient addresses and amounts - all will be
            processed in one transaction
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              backgroundColor: colors.dark,
              borderColor: colors.pink,
              color: colors.pink,
            }}
            className="w-full h-48 p-4 border-2 rounded-lg font-mono text-sm mb-2"
            placeholder={`mantra1example..., 5.2314\nmantra1another..., 10.1341\nmantra1third..., 15.7532`}
          />
          <div style={{ color: colors.pink }} className="text-xs">
            Distribute to unlimited addresses • All transfers processed
            atomically • Single transaction fee
          </div>
        </div>

        {/* Action Section */}
        <div className="pt-6 border-t" style={{ borderColor: colors.sun }}>
          <div className="flex items-center justify-between mb-4">
            <div style={{ color: colors.sun }} className="text-sm">
              Batch Transaction Status
            </div>
            <div style={{ color: colors.pink }} className="text-sm">
              ⚡️ Gas Optimized • 🔐 Single Signature • 🌐 Instant Distribution
            </div>
          </div>
          <button
            style={{
              backgroundColor: colors.sun,
              color: colors.dark,
            }}
            className="w-full py-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
            onClick={
              activeTab === "native" ? processNativeInput : processCw20Input
            }
          >
            {activeTab === "native"
              ? "Execute Batch $OM Distribution"
              : "Execute Batch CW20 Distribution"}
          </button>
          <div
            style={{ color: colors.pink }}
            className="text-center mt-3 text-xs"
          >
            All transfers are executed atomically in a single transaction
          </div>
        </div>
      </div>
    </div>
  );
};
