import type { DOMRefValue } from "@react-types/shared";
import { RefObject } from "react";

export function createDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T>) {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    },
  } as DOMRefValue<T>;
}
