import React, { useState } from "react";
import Schedule from "./components/schedule.tsx";
import { createPortal } from "react-dom";
import BookForm from "./components/book-form.tsx";
import Location from "./models/location.ts";

function App() {
  const [showBookModal, setShowBookModal] = useState(false);

  return (
    <div className="container max-w-[720px] mx-auto px-4 py-2">
      <div className="text-end">
        <button
          type="button"
          className="border-2 border-cyan-400 hover:border-cyan-600 text-cyan-400 hover:text-cyan-600 px-8 py-2 rounded-md font-bold"
          onClick={() => setShowBookModal(!showBookModal)}>
          Book
        </button>
      </div>

      <Schedule bookings={[]} />

      {showBookModal &&
        createPortal(
          <div className="fixed top-0 left-0 w-screen h-screen grid place-items-center  bg-slate-900/[0.5] z-10">
            <div className="w-[560px] max-w-[560px]">
              <BookForm
                onBook={data => {
                  console.log(data);
                  console.log(data.location === Location.first);
                }}
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
