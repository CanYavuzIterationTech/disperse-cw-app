//import Link from "next/link";

import { Wallet } from "./wallet";
//import BalanceCard from "./balance-card";

export default function Navbar() {
  const colors = {
    sun: "#F8B994",
    pink: "#FF97D6",
    dark: "#201E1D",
  };
  return (
    <header className="max-w-4xl mx-auto flex justify-between items-center mb-12">
      <div>
        <h1 style={{ color: colors.sun }} className="text-2xl font-bold mb-2">
          Batch Token Distribution
        </h1>
        <p style={{ color: colors.pink }} className="text-sm">
          One Transaction • Multiple Recipients • Full Transparency
        </p>
      </div>

      <Wallet
        style={{
          color: colors.sun,
          borderColor: colors.sun,
          backgroundColor: "transparent",
        }}
        className="px-6 py-3 border-2 rounded-lg font-medium hover:opacity-80 transition-opacity"
      />
    </header>
  );
}

{
  /* <BalanceCard />
<Wallet /> */
}
