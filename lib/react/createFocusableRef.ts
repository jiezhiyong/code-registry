import type { FocusableRefValue } from "@react-types/shared";
import type { RefObject } from "react";

import { createDOMRef } from "./createDOMRef";

export function createFocusableRef<T extends HTMLElement = HTMLElement>(
  domRef: RefObject<T>,
  focusableRef: RefObject<HTMLElement> = domRef,
): FocusableRefValue<T> {
  return {
    ...createDOMRef(domRef),
    focus() {
      if (focusableRef.current) {
        focusableRef.current.focus();
      }
    },
  };
}
