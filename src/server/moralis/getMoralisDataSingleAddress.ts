import { type EvmWalletHistoryTransaction } from "moralis/common-evm-utils";
import { isAddress, type Address } from "viem";
import { getMoralis } from "./index";

export async function getMoralisDataSingleAddress({
  address,
  chain,
}: {
  address: Address;
  chain: string;
}) {
  if (!address) {
    return;
  }

  const moralis = getMoralis();
  if (!moralis) {
    return;
  }

  let cursor: string | undefined = undefined;
  let walletHistory: EvmWalletHistoryTransaction[] = [];

  do {
    const result = await moralis.EvmApi.wallets.getWalletHistory({
      address,
      includeInternalTransactions: false,
      nftMetadata: false,
      chain: chain,
      cursor,
    });

    if (result.result.length === 0)
      return {
        address,
        error: "No data found",
      };

    walletHistory = walletHistory.concat(result.result);
    cursor = result.response.cursor;
  } while (cursor);

  const cleanedResult = walletHistory
    .map((res) => {
      if (
        !res.fromAddress ||
        !res.toAddress ||
        !isAddress(res.fromAddress.checksum) ||
        !isAddress(res.toAddress.checksum)
      ) {
        return {
          address,
          error: "Invalid data found",
        };
      }

      return {
        address,
        fromAddress: res.fromAddress.lowercase,
        toAddress: res.toAddress.lowercase,
        blockTimestamp: res.blockTimestamp,
      };
    })
    .filter(Boolean);

  return cleanedResult;
}
