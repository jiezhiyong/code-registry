import type { HTMLHeroUIProps } from "@/lib/system";
import type { SlotsToClasses } from "@/lib/theme";
import type { DateFieldState, DateSegment } from "@react-stately/datepicker";
import type { DateInputReturnType, DateInputSlots } from "./theme";

import { useDateSegment } from "@react-aria/datepicker";
import { useRef } from "react";

import { dataAttr, mergeProps } from "@/lib/base";

export interface DateInputSegmentProps extends HTMLHeroUIProps<"div"> {
  state: DateFieldState;
  segment: DateSegment;
  slots: DateInputReturnType;
  classNames?: SlotsToClasses<DateInputSlots>;
}

export const DateInputSegment: React.FC<DateInputSegmentProps> = ({
  state,
  segment,
  slots,
  classNames,
  ...otherProps
}) => {
  const ref = useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...mergeProps(segmentProps, otherProps)}
      ref={ref}
      className={slots.segment({
        class: classNames?.segment,
      })}
      data-editable={dataAttr(segment.isEditable)}
      data-invalid={dataAttr(state.isInvalid)}
      data-placeholder={dataAttr(segment.isPlaceholder)}
      data-slot="segment"
      data-type={segment.type}
      style={{
        ...segmentProps.style,
      }}
    >
      {segment.text}
    </div>
  );
};
