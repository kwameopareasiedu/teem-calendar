import Location from "./location.ts";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export default class Booking {
  readonly location: Location;
  readonly from: dayjs.Dayjs;
  readonly to: dayjs.Dayjs;

  constructor(location: Location, from: dayjs.Dayjs, to: dayjs.Dayjs) {
    this.location = location;
    this.from = from;
    this.to = to;
  }

  getDuration() {
    return this.to.diff(this.from, "hour");
  }
}

const startTime = dayjs("2023-01-01 09:00");
const endTime = dayjs("2023-01-01 16:00");

export const timeRange = Array(endTime.diff(startTime, "hours") + 1)
  .fill(undefined)
  .map((_, idx) => startTime.add(idx, "hours"));

export const prefixTime = (time: string) => `2023-01-01 ${time}`;

export const timeIsBetween = (
  time: dayjs.Dayjs,
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
) => {
  return (
    time.isSame(start, "hour") || time.isBetween(start, end, "hour")
    // || time.isSame(end, "second")
  );
};

/** Find a booking with the location and time */
export function findBooking(
  bookings: Booking[],
  location: Location,
  time: dayjs.Dayjs
) {
  for (const b of bookings) {
    if (location === b.location && timeIsBetween(time, b.from, b.to)) {
      return b;
    }
  }

  return undefined;
}

/** Checks if a booking conflicts with existing bookings */
export function bookingCreatesConflict(bookings: Booking[], booking: Booking) {
  for (const b of bookings) {
    if (
      b.location === booking.location &&
      (timeIsBetween(booking.from, b.from, b.to) ||
        timeIsBetween(b.from, booking.from, booking.to))
    ) {
      return b;
    }
  }

  return undefined;
}
