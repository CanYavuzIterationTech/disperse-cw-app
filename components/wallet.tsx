"use client";
import { Box } from "@interchain-ui/react";
import { WalletStatus } from "cosmos-kit";
import { useChain } from "@cosmos-kit/react";

//import {chains} from "chain-registry"

import { CHAIN_NAME } from "@/config";

import {
  ButtonConnect,
  ButtonConnected,
  ButtonConnecting,
  ButtonDisconnected,
  ButtonError,
  ButtonNotExist,
  ButtonRejected,
} from "./connect";

export function Wallet({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  // Find a chain that includes mantra in its name

  const { status, connect, openView } = useChain(CHAIN_NAME);

  const ConnectButton = {
    [WalletStatus.Connected]: (
      <ButtonConnected className={className} onClick={openView} style={style} />
    ),
    [WalletStatus.Connecting]: (
      <ButtonConnecting className={className} style={style} />
    ),
    [WalletStatus.Disconnected]: (
      <ButtonDisconnected
        className={className}
        onClick={connect}
        style={style}
      />
    ),
    [WalletStatus.Error]: (
      <ButtonError className={className} onClick={openView} style={style} />
    ),
    [WalletStatus.Rejected]: (
      <ButtonRejected className={className} onClick={connect} style={style} />
    ),
    [WalletStatus.NotExist]: (
      <ButtonNotExist className={className} onClick={openView} style={style} />
    ),
  }[status] || <ButtonConnect className={className} onClick={connect} />;

  return <Box py="$16">{ConnectButton}</Box>;
}
