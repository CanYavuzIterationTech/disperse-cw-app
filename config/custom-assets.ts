import { AssetListProps } from "@interchain-ui/react";

// custom-assets.ts
export const myCustomAssets = [
  {
    chain_name: "mantrachaintestnet2",
    assets: [
      {
        description: "The native token of MANTRA",
        denom_units: [
          {
            denom: "uom",
            exponent: 0,
          },
          {
            denom: "om",
            exponent: 6,
          },
        ],
        base: "uom",
        name: "MANTRA Chain",
        display: "om",
        symbol: "OM",
        keywords: [
          "mantra",
          "staking",
          "delegating",
          "governance",
          "regulation",
          "defi",
        ],
        traces: [
          {
            type: "test-mintage",
            counterparty: {
              chain_name: "mantrachain",
              base_denom: "uom",
            },
            provider: "MANTRA Chain",
          },
        ],
        images: [
          {
            image_sync: {
              chain_name: "mantrachain",
              base_denom: "uom",
            },
            png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/mantrachain/images/OM-Prim-Col.png",
            svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/mantrachain/images/OM-Prim-Col.svg",
            theme: {
              circle: true,
              primary_color_hex: "#fba0c1",
            },
          },
        ],
        type_asset: "sdk.coin",
      },
    ],
  },
];