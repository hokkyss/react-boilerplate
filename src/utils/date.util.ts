import type { StaticArray } from "@hokkyss/composite-types";

import chunk from "lodash/chunk";
import fill from "lodash/fill";
import map from "lodash/map";
import padStart from "lodash/padStart";
import reverse from "lodash/reverse";

import type { DateValue } from "~/constants/date.constant";

import { DAYS, MONTHS, Month } from "~/constants/date.constant";

/**
 * Convert a date into internal `DateValue` representation
 * @returns {DateValue}
 */
const convertDate = (date: Date): DateValue => ({
  date: date.getDate(),
  day: DAYS[date.getDay()],
  month: MONTHS[date.getMonth()],
  year: date.getFullYear(),
});

/**
 * today in internal `DateValue` representation
 */
export const TODAY = () => convertDate(new Date());

/**
 * Check if `year` is a leap year
 */
const isLeapYear = (year: number) =>
  year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

/**
 * Get the number of days in a month and year
 */
const getNumberOfDays = (month: Month, year: number) => {
  if (month === Month.FEBRUARY) {
    if (isLeapYear(year)) return 29;
    return 28;
  }
  if (
    month === Month.APRIL ||
    month === Month.JUNE ||
    month === Month.SEPTEMBER ||
    month === Month.NOVEMBER
  ) {
    return 30;
  }
  return 31;
};

/**
 * Get the internal representation of a date, given `date`, `month`, and `year`.
 */
const getDay = (date: number, month: Month, year: number) =>
  convertDate(
    new Date(`${padStart(date.toString(), 2, "0")} ${month} ${year}`)
  );

/**
 * Formats the date as "Day, Date Month Year".
 * @example
 * ```ts
 * const foo = formatDate(getDay(20, Month.JANUARY, 2022));
 * // foo = "Thu, 20 Jan 2022";
 * ```
 * @param date Internal date representation
 */
export const formatDate = (date: DateValue) =>
  `${date.day}, ${date.month} ${date.date} ${date.year}`;

/**
 * Get the first day of the previous month
 * @example
 * ```ts
 * const dec2022 = getPreviousMonth(Month.JANUARY, 2023);
 * // `dec2022` is 1 December 2022
 *
 * const nov2022 = getPreviousMonth(Month.NOVEMBER, 2022);
 * // `nov2022` is 1 November 2022
 * ```
 */
export const getPreviousMonth = (month: Month, year: number) => {
  const monthIndex = MONTHS.indexOf(month);
  /**
   * It is supposed to be `(monthIndex - 1) % 12`.
   *
   * However, `-1 = 11 (% 12)` so it doesn't change
   */
  const prevMonth = MONTHS[(monthIndex + 11) % 12];
  const prevYear = month === Month.JANUARY ? year - 1 : year;

  return getDay(1, prevMonth, prevYear);
};

/**
 * Get the first day of the next month
 * @example
 * ```ts
 * const jan2023 = getNextMonth(Month.DECEMBER, 2022);
 * // `jan2023` is 1 January 2023
 *
 * const nov2022 = getNextMonth(Month.OCTOBER, 2022);
 * // `nov2022` is 1 November 2022
 * ```
 */
export const getNextMonth = (month: Month, year: number) => {
  const monthIndex = MONTHS.indexOf(month);
  const nextMonth = MONTHS[(monthIndex + 1) % 12];
  const nextYear = month === Month.DECEMBER ? year + 1 : year;

  return getDay(1, nextMonth, nextYear);
};

export const isSameMonth = (date1: DateValue, date2: DateValue) =>
  date1.month === date2.month && date1.year === date2.year;

export const isSameDay = (date1: DateValue, date2: DateValue) =>
  date1.date === date2.date &&
  date1.month === date2.month &&
  date1.year === date2.year;

export default function calendar(
  { month, year } = TODAY()
): StaticArray<DateValue, 7>[] {
  const monthDays = getNumberOfDays(month, year);
  const thisMonthDates = map(fill(new Array(monthDays), 0), (_, i) =>
    getDay(i + 1, month, year)
  );
  const firstDay = thisMonthDates[0];
  const lastDay = thisMonthDates[monthDays - 1];

  const prevMonth = getPreviousMonth(month, year);
  const prevMonthDays = getNumberOfDays(prevMonth.month, prevMonth.year);
  // if firstDay is sunday (0), take 0 days from previous month
  // if firstDay is monday (1), take 1 day from previous month
  // and so on...
  const prevMonthTakenDays = DAYS.indexOf(firstDay.day);
  const prevMonthDates = reverse(
    map(fill(new Array(prevMonthTakenDays), 0), (_, i) =>
      getDay(prevMonthDays - i, prevMonth.month, prevMonth.year)
    )
  );

  const nextMonth = getNextMonth(month, year);
  // if lastday is sunday (0), take 6 days from next month
  // if lastday in monday (1), take 5 days from next month
  // and so on...
  const nextMonthTakenDays = 6 - DAYS.indexOf(lastDay.day);
  const nextMonthDates = map(fill(new Array(nextMonthTakenDays), 0), (_, i) =>
    getDay(i + 1, nextMonth.month, nextMonth.year)
  );

  return chunk(
    prevMonthDates.concat(thisMonthDates).concat(nextMonthDates),
    7
  ) as StaticArray<DateValue, 7>[];
}
