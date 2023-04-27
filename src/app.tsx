import React, { useState } from "react";
import Schedule from "./components/schedule.tsx";
import { createPortal } from "react-dom";
import BookForm from "./components/book-form.tsx";
import Booking, { bookingCreatesConflict } from "./models/booking.ts";

function App() {
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>();

  const addBooking = (booking: Booking) => {
    setShowBookModal(false);

    if (!bookingCreatesConflict(bookings, booking)) {
      setBookings([...bookings, booking]);
      setError(undefined);
    } else
      setError(
        `Booking at Location ${booking.location} from ${booking.from.format(
          "hh:mm A"
        )} to ${booking.to.format("hh:mm A")} creates a conflict`
      );
  };

  return (
    <div className="container max-w-[720px] mx-auto px-4 py-2">
      <div className="text-end">
        <button
          type="button"
          className="border-2 border-cyan-400 hover:border-cyan-600 text-cyan-400 hover:text-cyan-600 px-8 py-2 rounded-md font-bold mb-2"
          onClick={() => setShowBookModal(!showBookModal)}>
          Book
        </button>
      </div>

      {error && (
        <p className="text-center bg-red-400 px-4 py-2 rounded text-white font-bold">
          {error}
        </p>
      )}

      <Schedule bookings={bookings} />

      {showBookModal &&
        createPortal(
          <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center bg-slate-900/[0.5] z-10">
            <div className="w-[560px] max-w-[560px]">
              <BookForm
                onBook={addBooking}
                onClose={() => setShowBookModal(false)}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default App;
