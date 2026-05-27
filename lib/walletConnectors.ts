import type { Connector } from "wagmi";

const WEB_CONNECTOR_ORDER = ["rabby", "metaMask", "walletConnect", "baseAccount"] as const;

function connectorKind(connector: Connector): (typeof WEB_CONNECTOR_ORDER)[number] | null {
  const id = connector.id;
  const name = connector.name.toLowerCase();

  if (id === "walletConnect") return "walletConnect";
  if (id === "baseAccount") return "baseAccount";
  if (id === "metaMask" || name.includes("metamask")) return "metaMask";
  if (id === "rabby" || name.includes("rabby")) return "rabby";

  return null;
}

/** One button per wallet type (no duplicate Rabby / injected). */
export function pickWebWalletConnectors(connectors: readonly Connector[]): Connector[] {
  const picked = new Map<(typeof WEB_CONNECTOR_ORDER)[number], Connector>();

  for (const connector of connectors) {
    const kind = connectorKind(connector);
    if (!kind || picked.has(kind)) continue;
    picked.set(kind, connector);
  }

  return WEB_CONNECTOR_ORDER.map((kind) => picked.get(kind)).filter(
    (connector): connector is Connector => connector !== undefined,
  );
}

export function connectorLabel(connector: Connector): string {
  const kind = connectorKind(connector);
  if (kind === "baseAccount") return "Base";
  if (kind === "walletConnect") return "WalletConnect";
  if (kind === "rabby") return "Rabby";
  if (kind === "metaMask") return "MetaMask";
  return connector.name;
}
