import { useMemo, useState } from "react";
import { DateValue } from "~/constants/date.constant";
import calendar, {
  TODAY,
  getNextMonth,
  getPreviousMonth,
  isSameMonth,
} from "~/utils/date.util";
import useCallback from "../useCallback/useCallback.hook";

type UseDatePickerParams = {
  onChange: (date: DateValue) => void;
};

export default function useDatePicker({ onChange }: UseDatePickerParams) {
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

  return {
    previousMonth,
    nextMonth,
    handleChange,
    dates,
  };
}
