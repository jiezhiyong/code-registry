import animation from "./animation";
import custom from "./custom";
import scrollbarHide from "./scrollbar-hide";
import text from "./text";
import transition from "./transition";

export const utilities = {
  ...custom,
  ...transition,
  ...scrollbarHide,
  ...text,
  ...animation,
};
