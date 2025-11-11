import type { DOMRefValue } from "@react-types/shared";

export function createDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T>) {
  return {
    UNSAFE_getDOMNode() {
      return ref.current;
    },
  } as DOMRefValue<T>;
}
