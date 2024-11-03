import React, { MouseEventHandler } from "react";

import { Button as UIButton } from "@/components/ui/button";

export type ButtonProps = {
  text?: string;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ConnectProps = Pick<ButtonProps, "text" | "loading" | "onClick">;

function noop() {}

export function Button({
  text,
  disabled,
  onClick = noop,
  className,
  style,
}: Readonly<ButtonProps> & {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <UIButton
      onClick={onClick}
      //leftIcon={icon}
      disabled={disabled}
      className={className}
      style={style}
      //isLoading={loading}
      /** 
      domAttributes={{
        style: {
          flex: 1,
          backgroundImage:
            "linear-gradient(109.6deg, rgba(157,75,199,1) 11.2%, rgba(119,81,204,1) 83.1%)",
        },
      }}*/
    >
      {text}
    </UIButton>
  );
}

export const ButtonConnect = ({
  text = "Connect Wallet",
  onClick = noop,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button
    text={text}
    icon="walletFilled"
    className={className}
    onClick={onClick}
    style={style}
  />
);

export const ButtonConnected = ({
  text = "My Wallet",
  onClick = noop,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button
    text={text}
    icon="walletFilled"
    className={className}
    style={style}
    onClick={onClick}
  />
);

export const ButtonDisconnected = ({
  text = "Connect Wallet",
  onClick = noop,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button
    text={text}
    icon="walletFilled"
    className={className}
    onClick={onClick}
    style={style}
  />
);

export const ButtonConnecting = ({
  text = "Connecting ...",
  loading = true,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button text={text} loading={loading} className={className} style={style} />
);

export const ButtonRejected = ({
  text = "Reconnect",
  onClick = noop,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button
    text={text}
    icon="walletFilled"
    className={className}
    onClick={onClick}
    style={style}
  />
);

export const ButtonError = ({
  text = "Change Wallet",
  onClick = noop,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button
    text={text}
    icon="walletFilled"
    className={className}
    onClick={onClick}
    style={style}
  />
);

export const ButtonNotExist = ({
  text = "Install Wallet",
  onClick = noop,
  className,
  style,
}: ConnectProps & { className?: string; style?: React.CSSProperties }) => (
  <Button
    text={text}
    icon="walletFilled"
    className={className}
    onClick={onClick}
    style={style}
  />
);
