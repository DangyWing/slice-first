// import { MoralisNextApi } from "@moralisweb3/next";
import Moralis from "moralis";
import { env } from "~/env";

if (!Moralis.Core.isStarted) {
  await Moralis.start({
    apiKey: env.MORALIS_API_KEY,
  });
}

export function getMoralis() {
  try {
    if (!Moralis) throw new Error("Moralis not initialized");
    return Moralis;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    console.error(errorMessage);
  }
}
