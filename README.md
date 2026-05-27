# Medieval Donkey Tap (gruzgame08)

Base mini app — tap the donkey, batch onchain `tap`, paid `checkIn` every 2 minutes, local leaderboard.

## Env (Vercel / `.env.local`)

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_URL` | Optional on Vercel | Override public URL; else `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` |
| `NEXT_PUBLIC_GRUZGAME08_CONTRACT_ADDRESS` | Yes for onchain | After Remix deploy on Base |
| `NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE` | Yes for Verified + attribution | From [base.dev](https://base.dev) Builder Codes |
| `NEXT_PUBLIC_GRUZGAME08_BUILDER_CODE_DATA_SUFFIX` | Optional | Overrides auto ERC-8021 suffix from builder code |

**Deployed contract (Base):** `0xE7cD8d5Ee95150cba37629B915aB3C7F63ec5aCe`

Copy `.example.env` → `.env.local` and fill builder code.

## Scripts

```bash
npm install
npm run dev   # http://localhost:3008 (port 3000 often busy on this machine)
npm run build
npm run verify:calldata   # prints tap/checkIn calldata + builder suffix
```

## Smart contract

Deploy `contracts/GruzGame08Onchain.sol` on **Base Mainnet** via Remix (see contract file). Then set `NEXT_PUBLIC_GRUZGAME08_CONTRACT_ADDRESS`.

Builder attribution is appended in **transaction calldata** on the client (`withGruzGame08BuilderCodeDataSuffix`), not enforced in Solidity.
