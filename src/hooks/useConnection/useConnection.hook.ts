import { useEffect, useState } from "react";
import { type Callback } from "../useCallback/useCallback.hook";

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

const nav: NavigatorWithConnection | undefined =
  typeof navigator !== "undefined" ? navigator : undefined;

export type Connection = { online: boolean } & (
  | { isSupported: false }
  | ({ isSupported: true } & Partial<NetworkInformationAttributes>)
);

export default function useConnection(): Connection {
  const [connectionState, setConnectionState] = useState<Connection>({
    isSupported: true,
    online: !!nav?.onLine,
  });

  /* eslint-disable consistent-return */
  useEffect(() => {
    if (!nav) return;

    const onlineHandler = () =>
      setConnectionState((prev) => ({ ...prev, online: nav.onLine }));
    window.addEventListener("offline", onlineHandler);
    window.addEventListener("online", onlineHandler);

    if (!nav.connection) {
      return () => {
        window.removeEventListener("offline", onlineHandler);
        window.removeEventListener("online", onlineHandler);
      };
    }

    const conn = nav.connection;
    const stateHandler = () =>
      setConnectionState((prev) => ({
        ...prev,
        downlink: conn.downlink,
        downlinkMax: conn.downlinkMax,
        effectiveType: conn.effectiveType,
        isSupported: true,
        rtt: conn.rtt,
        saveData: conn.saveData,
        type: conn.type,
      }));
    conn.addEventListener("change", stateHandler);

    return () => {
      window.removeEventListener("offline", onlineHandler);
      window.removeEventListener("online", onlineHandler);
      conn.removeEventListener("change", stateHandler);
    };
  }, []);
  /* eslint-enable consistent-return */

  return connectionState;
}
