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
    onchargingchange: (e: Event) => void;
    onchargingtimechange: (e: Event) => void;
    ondischargingtimechange: (e: Event) => void;
    onlevelchange: (e: Event) => void;
  };

type NavigatorWithGetBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
};

type UseBattery =
  | { isSupported: false }
  | { isSupported: true; isFetched: false }
  | (BatteryState & { isSupported: true; isFetched: true });

const nav: NavigatorWithGetBattery | undefined =
  typeof navigator !== "undefined" ? navigator : undefined;

function useBattery() {
  const [battery, setBattery] = useState<UseBattery>({
    isSupported: true,
    isFetched: false,
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
    if (!batteryManager) return () => {};

    const onBatteryManagerChange = () => {
      setBattery((prev) => ({
        ...prev,
        charging: batteryManager.charging,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime,
        level: batteryManager.level,
        isFetched: true,
        isSupported: true,
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
