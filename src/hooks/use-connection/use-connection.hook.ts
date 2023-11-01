import type { Callback } from "../use-callback/use-callback.hook";

import isUndefined from "lodash/isUndefined";
import { useMemo, useSyncExternalStore } from "react";

/**
 * Provides information about the connection a device is using to communicate with the network.
 * Provides means for scripts to be notified if the connection type changes.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/downlink}
 */
type NetworkInformationAttributes = {
  /**
   * The effective bandwidth estimate in Mbps (rounded to the nearest multiple of 25kbps).
   * @experimental
   */
  downlink: number;
  /**
   * An `unrestricted double` representing the maximum downlink speed in Mbps, for the underlying connection technology.
   * @experimental
   */
  downlinkMax: number;
  /**
   * Effective type of the connection.
   * This property is determined by using a combination of recently observeed, rount-trip time and downlink values.
   * @experimental
   */
  effectiveType: "2g" | "3g" | "4g" | "slow-2g";

  /**
   * Estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25ms
   * This property is based on recently observed application-layer RTT measurements across recently active connections.
   * @experimental
   */
  rtt: number;

  /**
   * `true` if the user has set a reduced data usage option on the user agent
   * @experimental
   */
  saveData: boolean;

  /**
   * Type of connection a device is using to communicate with the network.
   * @experimental
   */
  type:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "other"
    | "unknown"
    | "wifi"
    | "wimax";
};

type NetworkInformationEvents = {
  onchange: Callback<(e: Event) => void>;
};

type NetworkInformation = EventTarget &
  Readonly<NetworkInformationAttributes> &
  NetworkInformationEvents;

type NavigatorWithConnection = Navigator & {
  readonly connection?: NetworkInformation;
};

const nav: NavigatorWithConnection | undefined = !isUndefined(navigator)
  ? navigator
  : undefined;

export type Connection = {
  online: boolean;
} & Partial<NetworkInformationAttributes>;

function subscribeConnection(callback: () => void) {
  if (nav?.connection) {
    nav.connection.addEventListener("change", callback);
  }

  return () => {
    if (nav?.connection) {
      nav.connection.removeEventListener("change", callback);
    }
  };
}

function subscribeOnline(callback: () => void) {
  window.addEventListener("offline", callback);
  window.addEventListener("online", callback);

  return () => {
    window.removeEventListener("offline", callback);
    window.removeEventListener("online", callback);
  };
}

export default function useConnection(): Connection {
  const online = useSyncExternalStore(
    subscribeOnline,
    () => !!nav?.onLine,
    () => true
  );
  const connectionState = useSyncExternalStore(
    subscribeConnection,
    () => nav?.connection,
    () => undefined
  );

  return useMemo(
    () => ({
      online,
      ...(connectionState
        ? {
            downlink: connectionState.downlink,
            downlinkMax: connectionState.downlinkMax,
            effectiveType: connectionState.effectiveType,
            rtt: connectionState.rtt,
            saveData: connectionState.saveData,
            type: connectionState.type,
          }
        : {}),
    }),
    [connectionState, online]
  );
}
