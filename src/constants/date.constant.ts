export enum Day {
  SUNDAY = "Sun",
  MONDAY = "Mon",
  TUESDAY = "Tue",
  WEDNESDAY = "Wed",
  THURSDAY = "Thu",
  FRIDAY = "Fri",
  SATURDAY = "Sat",
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
  JANUARY = "Jan",
  FEBRUARY = "Feb",
  MARCH = "Mar",
  APRIL = "Apr",
  MAY = "May",
  JUNE = "Jun",
  JULY = "Jul",
  AUGUST = "Aug",
  SEPTEMBER = "Sep",
  OCTOBER = "Oct",
  NOVEMBER = "Nov",
  DECEMBER = "Dec",
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
  year: number;
  month: Month;
  date: number;
  day: Day;
};
