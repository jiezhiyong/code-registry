import type { FocusableRef } from "@react-types/shared";
import type { RefObject } from "react";

import { useImperativeHandle, useRef } from "react";

import { createFocusableRef } from "./createFocusableRef";

export function useFocusableRef<T extends HTMLElement = HTMLElement>(
  ref: FocusableRef<T>,
  focusableRef?: RefObject<HTMLElement>,
): RefObject<T> {
  const domRef = useRef<T>(null) as RefObject<T>;

  useImperativeHandle(ref, () => createFocusableRef(domRef, focusableRef));

  return domRef;
}
