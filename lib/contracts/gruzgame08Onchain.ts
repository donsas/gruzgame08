import { isAddress } from "viem";

export const GRUZGAME08_CHECKIN_PRICE_ETH = "0.00001";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

/** Deployed on Base Mainnet — https://basescan.org/address/0xE7cD8d5Ee95150cba37629B915aB3C7F63ec5aCe */
export const GRUZGAME08_CONTRACT_ADDRESS_DEFAULT =
  "0xE7cD8d5Ee95150cba37629B915aB3C7F63ec5aCe" as const;

/** base.dev → Builder Codes (gruzgame08) */
export const GRUZGAME08_BUILDER_CODE = "bc_dea2s719";
export const GRUZGAME08_BUILDER_CODE_DATA_SUFFIX =
  "0x62635f64656132733731390b0080218021802180218021802180218021" as const;

export const gruzGame08OnchainAbi = [
  {
    inputs: [{ internalType: "uint256", name: "tapsCount", type: "uint256" }],
    name: "tap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkIn",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export function getGruzGame08ContractAddress(): `0x${string}` {
  const raw = process.env.NEXT_PUBLIC_GRUZGAME08_CONTRACT_ADDRESS?.trim();
  if (raw && isAddress(raw) && raw.toLowerCase() !== ZERO_ADDRESS) {
    return raw as `0x${string}`;
  }
  return GRUZGAME08_CONTRACT_ADDRESS_DEFAULT;
}

export function isGruzGame08ContractConfigured(): boolean {
  return isAddress(getGruzGame08ContractAddress());
}

export function withGruzGame08BuilderCodeDataSuffix(data: `0x${string}`): `0x${string}` {
  const explicit = process.env.NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE_DATA_SUFFIX?.trim();
  const suffix =
    explicit?.startsWith("0x") && explicit.length > 2
      ? (explicit as `0x${string}`)
      : GRUZGAME08_BUILDER_CODE_DATA_SUFFIX;
  if (!suffix || suffix === "0x" || suffix.length <= 2) {
    return data;
  }
  return `${data}${suffix.slice(2)}` as `0x${string}`;
}

export function isGruzGame08BuilderConfigured(): boolean {
  return GRUZGAME08_BUILDER_CODE_DATA_SUFFIX.length > 2;
}
