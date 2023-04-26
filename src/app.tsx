import React from "react";
import Schedule from "./components/schedule.tsx";

function App() {
  return (
    <div className="container max-w-[720px] mx-auto px-4 py-2">
      <Schedule bookings={[]} />
    </div>
  );
}

export default App;
