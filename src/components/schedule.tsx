import React from "react";
import Booking, { findBooking, timeRange } from "../models/booking.ts";
import Location from "../models/location.ts";

interface ScheduleProps {
  bookings: Booking[];
}

export default function Schedule({ bookings }: ScheduleProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="py-4" />
      <div className="text-center py-4">Location 1</div>
      <div className="text-center py-4">Location 2</div>
      <div className="text-center py-4">Location 3</div>

      {timeRange.map(d => {
        const [l1Booking, l2Booking, l3Booking] = [
          findBooking(bookings, Location.first, d),
          findBooking(bookings, Location.second, d),
          findBooking(bookings, Location.third, d)
        ];

        return (
          <>
            <div className="text-end">{d.format("HH:mm")}</div>
            {l1Booking ? <div /> : <div className="py-12" />}
            {l2Booking ? <div /> : <div className="py-12" />}
            {l3Booking ? <div /> : <div className="py-12" />}
          </>
        );
      })}
    </div>
  );
}
