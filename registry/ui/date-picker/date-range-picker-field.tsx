import type { HTMLHeroUIProps } from "@/lib/system";
import type { SlotsToClasses } from "@/lib/theme";
import type { DateInputProps } from "@/registry/ui/date-input";
import type { DateInputReturnType, DateInputSlots } from "@/registry/ui/date-input/theme";
import type { AriaDatePickerProps, DateValue } from "@react-types/datepicker";
import type { ForwardedRef, ReactElement } from "react";

import { createCalendar } from "@internationalized/date";
import { useDateField as useAriaDateField } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { useDateFieldState } from "@react-stately/datepicker";
import { forwardRef, useRef } from "react";

import { DateInputSegment } from "@/registry/ui/date-input";
import { filterDOMProps, useDOMRef } from "@/lib/react";
import { mergeProps } from "@/lib/base";

type HeroUIBaseProps<T extends DateValue> = Omit<HTMLHeroUIProps<"div">, keyof AriaDatePickerProps<T> | "onChange">;

export interface Props<T extends DateValue>
  extends HeroUIBaseProps<T>,
    AriaDatePickerProps<T>,
    Pick<DateInputProps, "createCalendar"> {
  /** DateInput classes slots. */
  slots: DateInputReturnType;
  /** DateInput classes. */
  classNames?: SlotsToClasses<DateInputSlots>;
}

export type DateRangePickerFieldProps<T extends DateValue = DateValue> = Props<T>;

const DateRangePickerField = forwardRef(function DateRangePickerField<T extends DateValue>(
  props: DateRangePickerFieldProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { as, slots, createCalendar: createCalendarProp, classNames, ...otherProps } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const { locale } = useLocale();

  let state = useDateFieldState({
    ...otherProps,
    locale,
    createCalendar:
      !createCalendarProp || typeof createCalendarProp !== "function"
        ? createCalendar
        : (createCalendarProp as typeof createCalendar),
  });

  const inputRef = useRef(null);

  const {
    fieldProps,
    inputProps,
    isInvalid: ariaIsInvalid,
  } = useAriaDateField({ ...otherProps, inputRef }, state, domRef);

  const isInvalid = props.isInvalid || ariaIsInvalid;

  state.isInvalid = isInvalid;

  return (
    <Component {...mergeProps(fieldProps, filterDOMProps(otherProps))} ref={domRef}>
      {state.segments.map((segment, i) => (
        <DateInputSegment key={i} classNames={classNames} segment={segment} slots={slots} state={state} />
      ))}
      <input {...inputProps} ref={inputRef} />
    </Component>
  );
}) as <T extends DateValue>(props: DateRangePickerFieldProps<T>) => ReactElement;

export default DateRangePickerField;
