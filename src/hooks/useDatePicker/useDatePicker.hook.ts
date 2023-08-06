import { useMemo, useState } from "react";
import type { DateValue } from "~/constants/date.constant";
import calendar, {
  TODAY,
  getNextMonth,
  getPreviousMonth,
  isSameMonth,
} from "~/utils/date.util";
import type { Callback } from "../useCallback/useCallback.hook";
import useCallback from "../useCallback/useCallback.hook";

type UseDatePickerProps = {
  onChange: Callback<(date: DateValue) => void>;
};

export type DatePicker = {
  dates: DateValue[][];
  handleChange: Callback<(date: DateValue) => void>;
  nextMonth: Callback<() => void>;
  previousMonth: Callback<() => void>;
};

export default function useDatePicker({
  onChange,
}: UseDatePickerProps): DatePicker {
  const [currentMonth, setCurrentMonth] = useState(TODAY());

  const previousMonth = useCallback(
    () =>
      setCurrentMonth((current) =>
        getPreviousMonth(current.month, current.year)
      ),
    []
  );

  const nextMonth = useCallback(
    () =>
      setCurrentMonth((current) => getNextMonth(current.month, current.year)),
    []
  );

  const handleChange = useCallback(
    (date: DateValue) => {
      if (!isSameMonth(date, currentMonth)) {
        if (
          isSameMonth(
            date,
            getPreviousMonth(currentMonth.month, currentMonth.year)
          )
        ) {
          previousMonth();
        } else if (
          isSameMonth(date, getNextMonth(currentMonth.month, currentMonth.year))
        ) {
          nextMonth();
        }
      }
      onChange(date);
    },
    [currentMonth, onChange, previousMonth, nextMonth]
  );

  const dates = useMemo(() => calendar(currentMonth), [currentMonth]);

  const returnValue = useMemo<DatePicker>(
    () => ({ dates, handleChange, nextMonth, previousMonth }),
    [previousMonth, nextMonth, handleChange, dates]
  );

  return returnValue;
}
