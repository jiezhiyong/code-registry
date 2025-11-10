import type { CalendarState, RangeCalendarState } from "@react-stately/calendar";
import type { ContextType } from "./use-calendar-base";

import { createContext } from "@/lib/react";

export const [CalendarProvider, useCalendarContext] = createContext<ContextType<CalendarState | RangeCalendarState>>({
  name: "CalendarContext",
  strict: true,
  errorMessage: "useContext: `context` is undefined. Seems you forgot to wrap component within the CalendarProvider",
});
