import { encodeFunctionData } from "viem";

const BUILDER_CODE = "bc_dea2s719";
const suffix = "62635f64656132733731390b0080218021802180218021802180218021";
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

console.log("Builder code:", BUILDER_CODE);
console.log("Suffix:", `0x${suffix}`);
console.log("");
console.log("tap(3):", withSuffix(tap));
console.log("checkIn():", withSuffix(checkIn));
