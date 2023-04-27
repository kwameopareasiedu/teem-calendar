import React from "react";
import Booking, { findBooking, timeRange } from "../models/booking.ts";
import Location from "../models/location.ts";
import * as dayjs from "dayjs";

interface ScheduleProps {
  bookings: Booking[];
}

export default function Schedule({ bookings }: ScheduleProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="py-4 bg-white" />
      <div className="text-center py-4 bg-white">Location 1</div>
      <div className="text-center py-4 bg-white">Location 2</div>
      <div className="text-center py-4 bg-white">Location 3</div>

      {timeRange.slice(0, -1).map(d => {
        const [l1Booking, l2Booking, l3Booking] = [
          findBooking(bookings, Location.first, d),
          findBooking(bookings, Location.second, d),
          findBooking(bookings, Location.third, d)
        ];

        return (
          <>
            <div className="text-end bg-white">{d.format("HH:mm")}</div>
            <ScheduleEntry time={d} booking={l1Booking} />
            <ScheduleEntry time={d} booking={l2Booking} />
            <ScheduleEntry time={d} booking={l3Booking} />
          </>
        );
      })}
    </div>
  );
}

interface ScheduleEntryProps {
  time: dayjs.Dayjs;
  booking?: Booking;
}

function ScheduleEntry({ booking, time }: ScheduleEntryProps) {
  const hide = !booking?.from?.isSame(time);

  if (!booking) return <div className="py-8 bg-white" />;

  if (hide) return <div className="hidden" />;

  return (
    <div
      className="grid place-items-center py-12 border-[3px] border-black bg-green-100 bg-white"
      style={{
        gridRow: `span ${booking.getDuration()} / span ${booking.getDuration()}`
      }}>
      <p className="text-center">Booked</p>
    </div>
  );
}
