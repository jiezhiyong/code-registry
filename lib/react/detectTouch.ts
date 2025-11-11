import { isBrowser } from "./canUseDOM";

export function detectTouch() {
  if (!isBrowser) return false;

  return window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null;
}
