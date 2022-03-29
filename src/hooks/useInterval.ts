import { useEffect, useRef } from "react";

import { Callback, Delay } from "../utils/types";

export const useInterval = (callback: Callback, delay: Delay) => {
  const callbackRef = useRef<Callback>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => callbackRef.current!(...args);

    if (delay !== null) {
      const interval = setInterval(handler, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
