import { Attribution } from "ox/erc8021";
import { isAddress } from "viem";

export const GRUZGAME08_CHECKIN_PRICE_ETH = "0.00001";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

/** Deployed on Base Mainnet — https://basescan.org/address/0xE7cD8d5Ee95150cba37629B915aB3C7F63ec5aCe */
export const GRUZGAME08_CONTRACT_ADDRESS_DEFAULT =
  "0xE7cD8d5Ee95150cba37629B915aB3C7F63ec5aCe" as const;

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

/** Env override (Vercel) or deployed default. */
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

/** Optional: NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE (e.g. bc_xxxxx from base.dev). */
export function getGruzGame08BuilderCode(): string | null {
  const code = process.env.NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE?.trim();
  return code || null;
}

/**
 * ERC-8021 / Base builder suffix for calldata.
 * Prefer explicit NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE_DATA_SUFFIX; else derive from builder code via ox.
 */
export function getGruzGame08BuilderCodeDataSuffix(): `0x${string}` {
  const explicit = process.env.NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE_DATA_SUFFIX?.trim();
  if (explicit?.startsWith("0x") && explicit.length > 2) {
    return explicit as `0x${string}`;
  }
  const code = getGruzGame08BuilderCode();
  if (!code) return "0x";
  return Attribution.toDataSuffix({ codes: [code] });
}

export function isGruzGame08BuilderConfigured(): boolean {
  const suffix = getGruzGame08BuilderCodeDataSuffix();
  return suffix !== "0x" && suffix.length > 2;
}

/** Appends Builder Code encoded suffix to function calldata (tap / checkIn). */
export function withGruzGame08BuilderCodeDataSuffix(data: `0x${string}`): `0x${string}` {
  const suffix = getGruzGame08BuilderCodeDataSuffix();
  if (!suffix || suffix === "0x" || suffix.length <= 2) {
    return data;
  }
  return `${data}${suffix.slice(2)}` as `0x${string}`;
}
