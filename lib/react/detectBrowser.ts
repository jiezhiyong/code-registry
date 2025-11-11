import { isBrowser } from "./canUseDOM";
import { getUserAgentBrowser } from "./getUserAgentBrowser";

export type UserAgentBrowser = NonNullable<ReturnType<typeof getUserAgentBrowser>>;

export function detectBrowser(browser: UserAgentBrowser) {
  if (!isBrowser) return false;

  return getUserAgentBrowser(window.navigator) === browser;
}
