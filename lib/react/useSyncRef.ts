import type { MutableRefObject, RefObject } from "react";

import { useLayoutEffect } from "react";

export interface ContextValue<T> {
  ref?: MutableRefObject<T>;
}

// Syncs ref from context with ref passed to hook
export function useSyncRef<T>(context: ContextValue<T | null>, ref: RefObject<T>) {
  useLayoutEffect(() => {
    if (context && context.ref && ref && ref.current) {
      context.ref.current = ref.current;

      return () => {
        if (context.ref?.current) {
          context.ref.current = null;
        }
      };
    }
  }, [context, ref]);
}
