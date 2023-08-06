import type { Callback } from "../useCallback/useCallback.hook";

import isUndefined from "lodash/isUndefined";
import noop from "lodash/noop";
import { useEffect, useState } from "react";

type BatteryState = {
  /**
   * A `Boolean` value indicating whether the battery is currently being charged
   */
  charging: boolean;
  /**
   * A `number` representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
   */
  chargingTime: number;
  /**
   * A `number` representing the remaining time in seconds until the battery is completely discharged and the system suspends.
   */
  dischargingTime: number;
  /**
   * A `number` representing the system's battery charge level scaled to a value between 0.0 and 1.0
   */
  level: number;
};

type BatteryManager = EventTarget &
  Readonly<BatteryState> & {
    onchargingchange: Callback<(e: Event) => void>;
    onchargingtimechange: Callback<(e: Event) => void>;
    ondischargingtimechange: Callback<(e: Event) => void>;
    onlevelchange: Callback<(e: Event) => void>;
  };

type NavigatorWithGetBattery = Navigator & {
  getBattery?: Callback<() => Promise<BatteryManager>>;
};

const nav: NavigatorWithGetBattery | undefined = !isUndefined(navigator)
  ? navigator
  : undefined;

export type Battery =
  | { isFetched: false; isSupported: true }
  | { isSupported: false }
  | (BatteryState & { isFetched: true; isSupported: true });

function useBattery(): Battery {
  const [battery, setBattery] = useState<Battery>({
    isFetched: false,
    isSupported: true,
  });
  const [batteryManager, setBatteryManager] = useState<BatteryManager>();

  useEffect(() => {
    if (!nav || !nav.getBattery) {
      setBattery({ isSupported: false });
      return;
    }

    nav
      .getBattery()
      .then((manager) => setBatteryManager(manager))
      .catch(() => {
        setBattery({
          isSupported: false,
        });
      });
  }, []);

  useEffect(() => {
    if (!batteryManager) return noop;

    const onBatteryManagerChange = () => {
      setBattery((prev) => ({
        ...prev,
        charging: batteryManager.charging,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime,
        isFetched: true,
        isSupported: true,
        level: batteryManager.level,
      }));
    };

    batteryManager.addEventListener("chargingchange", onBatteryManagerChange);
    batteryManager.addEventListener(
      "changingtimechange",
      onBatteryManagerChange
    );
    batteryManager.addEventListener(
      "dischargingtimechange",
      onBatteryManagerChange
    );
    batteryManager.addEventListener("levelchange", onBatteryManagerChange);

    return () => {
      batteryManager.removeEventListener(
        "chargingchange",
        onBatteryManagerChange
      );
      batteryManager.removeEventListener(
        "changingtimechange",
        onBatteryManagerChange
      );
      batteryManager.removeEventListener(
        "dischargingtimechange",
        onBatteryManagerChange
      );
      batteryManager.removeEventListener("levelchange", onBatteryManagerChange);
    };
  }, [batteryManager]);

  return battery;
}

export default useBattery;
