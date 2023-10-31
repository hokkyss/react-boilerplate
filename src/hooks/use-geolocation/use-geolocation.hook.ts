import noop from "lodash/noop";
import { useEffect, useMemo, useState } from "react";

import useCallback from "../use-callback/use-callback.hook";
import usePermission from "../use-permission/use-permission.hook";

type GeolocationState =
  | {
      /**
       * Returns a `double` representing the accuracy of the `latitude` and `longitude` properties, expressed in meters.
       */
      accuracy: number;
      /**
       * Returns a `double` representing the position's altitude in meters, relative to sea level.
       * This value can be `null` if the implementation cannot provide the data.
       */
      altitude: null | number;
      /**
       * Returns a `double` representing the accuracy of the `altitude` expressed in meters. This value can be `null`.
       */
      altitudeAccuracy: null | number;
      /**
       * Returns a `double` representing the direction towards which the device is facing.
       * This value indicates how far off from heading true north the device is, specified in degrees.
       * `0` degrees represents true north, and the direction is determined clockwise (which means that east is `90` degrees and west is `270` degrees)
       * If `speed` is `0`, `heading` is `NaN`.
       * If the device is unable to provide `heading` information, this value is `null`.
       */
      heading: null | number;
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
       * Returns a `double` representing the velocity of the device in meters per second. This value can be `null`.
       */
      speed: null | number;
    }
  | { isError: true; isFetched: true }
  | { isFetched: false };

export type Geolocation = [GeolocationState, Date];

export default function useGeolocation(): Geolocation {
  const permission = usePermission("geolocation");
  const [lastRecorded, setLastRecorded] = useState(new Date());
  const [coordinates, setCoordinates] = useState<GeolocationState>({
    isFetched: false,
  });

  const positionCallback = useCallback<PositionCallback>((position) => {
    setCoordinates({
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      isError: false,
      isFetched: true,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      speed: position.coords.speed,
    });
    setLastRecorded(new Date(position.timestamp));
  }, []);

  const positionErrorCallback = useCallback<PositionErrorCallback>(() => {
    setLastRecorded(new Date());
    setCoordinates({
      isError: true,
      isFetched: true,
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

  const returnValue = useMemo<Geolocation>(
    () => [coordinates, lastRecorded],
    [coordinates, lastRecorded]
  );

  return returnValue;
}
