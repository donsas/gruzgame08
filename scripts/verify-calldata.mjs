import { encodeFunctionData } from "viem";
import { Attribution } from "ox/erc8021";

const builderCode = process.env.NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE?.trim();
const explicitSuffix = process.env.NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE_DATA_SUFFIX?.trim();

if (!builderCode && !explicitSuffix) {
  console.error("Set NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE or NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE_DATA_SUFFIX");
  process.exit(1);
}

const suffix = explicitSuffix?.startsWith("0x")
  ? explicitSuffix.slice(2)
  : Attribution.toDataSuffix({ codes: [builderCode] }).slice(2);

const withSuffix = (data) => `${data}${suffix}`;

const abi = [
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
];

const tap = encodeFunctionData({ abi, functionName: "tap", args: [3n] });
const checkIn = encodeFunctionData({ abi, functionName: "checkIn" });

console.log("Builder code:", builderCode ?? "(from explicit suffix only)");
console.log("Suffix:", `0x${suffix}`);
console.log("");
console.log("tap(3):", withSuffix(tap));
console.log("checkIn():", withSuffix(checkIn));
