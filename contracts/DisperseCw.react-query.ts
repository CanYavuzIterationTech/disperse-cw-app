/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import {
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { StdFee } from "@cosmjs/amino";
import {
  //InstantiateMsg,
  //ExecuteMsg,
  Uint128,
  Binary,
  //Cw20ReceiveMsg, // We will use this fucking shit oh my lord
  RecipientNative,
  Coin,
  //QueryMsg,
  //MigrateMsg,
} from "./DisperseCw.types";
import { DisperseCwQueryClient, DisperseCwClient } from "./DisperseCw.client";
export const disperseCwQueryKeys = {
  contract: [
    {
      contract: "disperseCw",
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [
      {
        ...disperseCwQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
};
export interface DisperseCwReactQuery<TResponse, TData = TResponse> {
  client: DisperseCwQueryClient | undefined;
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined;
  };
}
export interface DisperseCwDisperseNativeMutation {
  client: DisperseCwClient;
  msg: {
    recipients: RecipientNative[];
  };
  args?: {
    fee?: number | StdFee | "auto";
    memo?: string;
    funds?: Coin[];
  };
}
export function useDisperseCwDisperseNativeMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, DisperseCwDisperseNativeMutation>,
    "mutationFn"
  >
) {
  return useMutation<ExecuteResult, Error, DisperseCwDisperseNativeMutation>({
    mutationFn: ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.disperseNative(msg, fee, memo, funds),
    ...options,
  });
}
export interface DisperseCwReceiveMutation {
  client: DisperseCwClient;
  msg: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  };
  args?: {
    fee?: number | StdFee | "auto";
    memo?: string;
    funds?: Coin[];
  };
}
export function useDisperseCwReceiveMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, DisperseCwReceiveMutation>,
    "mutationFn"
  >
) {
  return useMutation<ExecuteResult, Error, DisperseCwReceiveMutation>({
    mutationFn: ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.receive(msg, fee, memo, funds),
    ...options,
  });
}
