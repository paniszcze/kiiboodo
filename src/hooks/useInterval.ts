import { useEffect, useRef } from "react";

import { CallbackType, DelayType } from "../utils/types";

export const useInterval = (callback: CallbackType, delay: DelayType) => {
  const callbackRef = useRef<CallbackType>();

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
