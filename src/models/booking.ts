import Location from "./location.ts";
import * as dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default interface Booking {
  readonly location: Location;
  readonly from: string;
  readonly to: string;
}

/** Find a booking with the location and time */
export function findBooking(
  bookings: Booking[],
  location: Location,
  time: dayjs.ConfigType
) {
  const dayjsTime = dayjs(time);

  for (const booking of bookings) {
    if (
      location === booking.location &&
      dayjsTime.isSameOrAfter(booking.from) &&
      dayjsTime.isSameOrBefore(booking.to)
    ) {
      return booking;
    }
  }

  return undefined;
}

const startTime = dayjs("2023-04-26 09:00");
const endTime = dayjs("2023-04-26 15:00");
export const timeRange = Array(endTime.diff(startTime, "hours") + 1)
  .fill(undefined)
  .map((_, idx) => startTime.add(idx, "hours"));
