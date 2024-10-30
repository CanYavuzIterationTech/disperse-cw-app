// mantra-chain.ts
export const mantraDukongChain = {
    chain_name: "mantrachaintestnet2",
    chain_id: "mantra-dukong-1",
    chain_type: "testnet",
    rpc: ["https://rpc.dukong.mantrachain.io"],
    rest: ["https://api.dukong.mantrachain.io"],
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "mantra",
      bech32PrefixAccPub: "mantrapub",
      bech32PrefixValAddr: "mantravaloper",
      bech32PrefixValPub: "mantravaloperpub",
      bech32PrefixConsAddr: "mantravalcons",
      bech32PrefixConsPub: "mantravalconspub",
    },
    currencies: [
      {
        coinDenom: "OM",
        coinMinimalDenom: "uom",
        coinDecimals: 6,
        coinGeckoId: "mantra-dao",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "OM",
        coinMinimalDenom: "uom",
        coinDecimals: 6,
        coinGeckoId: "mantra-dao",
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.03,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "OM",
      coinMinimalDenom: "uom",
      coinDecimals: 6,
      coinGeckoId: "mantra-dao",
    },
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
    features: [],
  } ;
  