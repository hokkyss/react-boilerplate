import noop from "lodash/noop";
import { useEffect, useState } from "react";
import useCallback from "../useCallback/useCallback.hook";
import usePermission from "../usePermission/usePermission.hook";

type GeolocationState =
  | { isFetched: false }
  | { isFetched: true; isError: true }
  | {
      isError: false;
      isFetched: true;
      /**
       * Returns a `double` representing the position's latitude in decimal degrees.
       */
      latitude: number;
      /**
       * Returns a `double` representing the position's longitude in decimal degrees.
       */
      longitude: number;
      /**
       * Returns a `double` representing the accuracy of the `latitude` and `longitude` properties, expressed in meters.
       */
      accuracy: number;

      /**
       * Returns a `double` representing the position's altitude in meters, relative to sea level.
       * This value can be `null` if the implementation cannot provide the data.
       */
      altitude: number | null;
      /**
       * Returns a `double` representing the accuracy of the `altitude` expressed in meters. This value can be `null`.
       */
      altitudeAccuracy: number | null;

      /**
       * Returns a `double` representing the direction towards which the device is facing.
       * This value indicates how far off from heading true north the device is, specified in degrees.
       * `0` degrees represents true north, and the direction is determined clockwise (which means that east is `90` degrees and west is `270` degrees)
       * If `speed` is `0`, `heading` is `NaN`.
       * If the device is unable to provide `heading` information, this value is `null`.
       */
      heading: number | null;
      /**
       * Returns a `double` representing the velocity of the device in meters per second. This value can be `null`.
       */
      speed: number | null;
    };

export default function useGeolocation() {
  const permission = usePermission("geolocation");
  const [lastRecorded, setLastRecorded] = useState(new Date());
  const [coordinates, setCoordinates] = useState<GeolocationState>({
    isFetched: false,
  });

  const positionCallback = useCallback<PositionCallback>((position) => {
    setCoordinates({
      isFetched: true,
      isError: false,
      accuracy: position.coords.accuracy,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
    });
    setLastRecorded(new Date(position.timestamp));
  }, []);

  const positionErrorCallback = useCallback<PositionErrorCallback>(() => {
    setLastRecorded(new Date());
    setCoordinates({
      isFetched: true,
      isError: true,
    });
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      return noop;
    }
    if (!permission.isFetched || permission.status === "denied") {
      return noop;
    }

    navigator.geolocation.getCurrentPosition(
      positionCallback,
      positionErrorCallback
    );
    const watchId = navigator.geolocation.watchPosition(
      positionCallback,
      positionErrorCallback
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [permission, positionCallback, positionErrorCallback]);

  return [coordinates, lastRecorded] as const;
}
