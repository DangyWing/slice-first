import { type Address } from "viem";
import { evmChains } from "config";
import { getMoralisDataSingleAddress } from "./getMoralisDataSingleAddress";

export async function getMoralisDataMultipleAddressesAndChains({
  addresses,
  chains,
}: {
  addresses: Address[];
  chains: string[];
}) {
  // validate chains against config
  const validChainIds = chains
    .map((chain) => evmChains.find((c) => c.name === chain)?.hexId)
    .filter(Boolean);

  const combinedResults = await Promise.allSettled(
    validChainIds.flatMap((chain) =>
      Array.from(addresses).flatMap(async (address) => {
        try {
          return await getMoralisDataSingleAddress({ address, chain });
        } catch (error) {
          console.error(`Error fetching data for address ${address} on chain ${chain}:`, error);
          return null;
        }
      })
    )
  );

  const fulfilled = combinedResults
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .filter(Boolean);

  const errors = fulfilled.filter((result) => result.error);
  const valid = fulfilled.filter((result) => !result.error);

  //todo: Handle rejected
  // const rejected = combinedResults
  //   .filter((result) => result.status === "rejected")
  //   .map((result) => result?.reason as Error);

  return { errors, valid };
}
