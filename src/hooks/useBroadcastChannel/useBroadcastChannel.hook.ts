import noop from "lodash/noop";
import { useEffect, useRef } from "react";

type SerializableData =
  | undefined
  | null
  | number
  | Date
  | boolean
  | Array<unknown>
  | Map<unknown, unknown>
  | Set<unknown>
  | object
  | string;

type PostMessage<T extends SerializableData> = (message: T) => void;

export default function useBroadcastChannel<T extends SerializableData>(
  name: string,
  onMessage: UseCallback<(e: MessageEvent<T>) => void>
): PostMessage<T> {
  const channel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel(name);
    channel.current = broadcastChannel;
    broadcastChannel.addEventListener("message", onMessage);

    return () => {
      broadcastChannel.removeEventListener("message", onMessage);
      broadcastChannel.close();
      channel.current = null;
    };
  }, [name, onMessage]);

  return channel.current ? channel.current.postMessage : noop;
}
