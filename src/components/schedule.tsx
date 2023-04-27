import React from "react";
import Booking, { findBooking, timeRange } from "../models/booking.ts";
import Location from "../models/location.ts";
import dayjs from "dayjs";

interface ScheduleProps {
  bookings: Booking[];
  onRemove: (booking: Booking) => void;
}

export default function Schedule({ bookings, onRemove }: ScheduleProps) {
  return (
    <div className="grid grid-cols-4 gap-4 schedule-grid">
      <div className="grid place-items-center h-16" />
      <div className="text-center grid place-items-center">Location 1</div>
      <div className="text-center grid place-items-center">Location 2</div>
      <div className="text-center grid place-items-center">Location 3</div>

      {timeRange.slice(0, -1).map(d => {
        const [l1Booking, l2Booking, l3Booking] = [
          findBooking(bookings, Location.first, d),
          findBooking(bookings, Location.second, d),
          findBooking(bookings, Location.third, d)
        ];

        return (
          <>
            <div className="text-end h-16">{d.format("hh:mm A")}</div>
            <ScheduleEntry time={d} booking={l1Booking} onRemove={onRemove} />
            <ScheduleEntry time={d} booking={l2Booking} onRemove={onRemove} />
            <ScheduleEntry time={d} booking={l3Booking} onRemove={onRemove} />
          </>
        );
      })}
    </div>
  );
}

interface ScheduleEntryProps {
  time: dayjs.Dayjs;
  booking?: Booking;
  onRemove: (booking: Booking) => void;
}

function ScheduleEntry({ booking, time, onRemove }: ScheduleEntryProps) {
  const hide = !booking?.from?.isSame(time);

  if (!booking) return <div className="py-8" />;

  if (hide) return <div className="hidden" />;

  return (
    <div
      className="grid place-items-center border-[3px] border-black bg-green-100 hover:cursor-pointer"
      style={{
        gridRow: `span ${booking.getDuration()} / span ${booking.getDuration()}`
      }}
      onClick={() => onRemove(booking)}>
      <p className="text-center">
        <span className="">Booked</span>
        <br />
        <span className="text-xs text-gray-500">Click to unbook</span>
      </p>
    </div>
  );
}
