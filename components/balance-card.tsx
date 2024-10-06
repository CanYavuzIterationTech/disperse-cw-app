"use client";

import { CardHeader, Card } from "@/components/ui/card";
import { CW20_ADDRESS } from "@/constants";
import { useCw20BaseBalanceQuery } from "@/contracts/Cw20Base.react-query";
import { useCw20BaseQueryClient } from "@/hooks/use-cw20-base-query-client";
import { formatToken } from "@/lib/format-token";

export default function BalanceCard() {
  const { cw20BaseClient: cw20QueryClient, userAddress } =
    useCw20BaseQueryClient(CW20_ADDRESS);

  const { data } = useCw20BaseBalanceQuery({
    client: cw20QueryClient,
    args: {
      address: userAddress ?? "",
    },
  });

  if (!data) {
    return null;
  }

  return (
    <Card className="w-40 max-w-sm rounded-xl border ">
      <CardHeader className="p-2 ">
        {/* Text should start on right */}
        <p className="text-center">{formatToken(data.balance)} $DISPERSE</p>
      </CardHeader>
    </Card>
  );
}
