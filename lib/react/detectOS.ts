import type { UserAgentOS } from "./getUserAgentOS";

import { isBrowser } from "./canUseDOM";
import { getUserAgentOS } from "./getUserAgentOS";

export function detectOS(os: UserAgentOS) {
  if (!isBrowser) return false;

  return getUserAgentOS(window.navigator) === os;
}
