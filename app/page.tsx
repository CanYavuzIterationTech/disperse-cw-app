import { Fuck } from "@/components/dispenser-tabs";

export default function Home() {

  const colors = {
    sun: "#F8B994",
    pink: "#FF97D6",
    dark: "#201E1D",
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <div className="text-center mb-12">
          <h2 style={{ color: colors.sun }} className="text-3xl font-bold mb-4">
            Send Tokens to Multiple Addresses in One Transaction
          </h2>
          <p
            style={{ color: colors.pink }}
            className="max-w-2xl mx-auto text-lg mb-6"
          >
            Efficiently distribute tokens to hundreds of addresses with a single
            smart contract transaction. Save time and gas fees while maintaining
            complete on-chain transparency.
          </p>
          <div className="flex justify-center gap-8 mt-6">
            <div style={{ color: colors.sun }} className="text-center">
              <div className="text-sm font-medium mb-1">Batch Processing</div>
              <div style={{ color: colors.pink }} className="text-xs">
                One Transaction, Multiple Recipients
              </div>
            </div>
            <div style={{ color: colors.sun }} className="text-center">
              <div className="text-sm font-medium mb-1">Gas Efficient</div>
              <div style={{ color: colors.pink }} className="text-xs">
                Optimized Contract Execution
              </div>
            </div>
            <div style={{ color: colors.sun }} className="text-center">
              <div className="text-sm font-medium mb-1">Token Flexibility</div>
              <div style={{ color: colors.pink }} className="text-xs">
                Native $OM or Any CW20 Token
              </div>
            </div>
          </div>
        </div>
        <Fuck />
      </div>
    </>
  );
}
