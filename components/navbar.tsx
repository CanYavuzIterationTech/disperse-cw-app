import Link from "next/link";

import { Wallet } from "./wallet";
import BalanceCard from "./balance-card";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-semibold">DISPERSE CW TEST</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        {/** 
        <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground" prefetch={false}>
          Home
        </Link>
        <Link href="/transfer" className="text-sm font-medium text-muted-foreground hover:text-foreground" prefetch={false}>
          Transfer
        </Link>
*/}
      </nav>
      <div className="flex gap-2 items-center">
        <BalanceCard />
        <Wallet />
      </div>
    </header>
  );
}
