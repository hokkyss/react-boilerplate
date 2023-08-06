export enum Day {
  FRIDAY = "Fri",
  MONDAY = "Mon",
  SATURDAY = "Sat",
  SUNDAY = "Sun",
  THURSDAY = "Thu",
  TUESDAY = "Tue",
  WEDNESDAY = "Wed",
}

export const DAYS = [
  Day.SUNDAY,
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
];

export enum Month {
  APRIL = "Apr",
  AUGUST = "Aug",
  DECEMBER = "Dec",
  FEBRUARY = "Feb",
  JANUARY = "Jan",
  JULY = "Jul",
  JUNE = "Jun",
  MARCH = "Mar",
  MAY = "May",
  NOVEMBER = "Nov",
  OCTOBER = "Oct",
  SEPTEMBER = "Sep",
}

export const MONTHS = [
  Month.JANUARY,
  Month.FEBRUARY,
  Month.MARCH,
  Month.APRIL,
  Month.MAY,
  Month.JUNE,
  Month.JULY,
  Month.AUGUST,
  Month.SEPTEMBER,
  Month.OCTOBER,
  Month.NOVEMBER,
  Month.DECEMBER,
];

export const CALENDAR_WEEKS_COUNT = 6;

export type DateValue = {
  date: number;
  day: Day;
  month: Month;
  year: number;
};
