"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPERORY DATA
const events = [
  {
    id: 1,
    title: "Lake Trip",
    time: "12:00 PM to 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Picnic",
    time: "2:00 PM to 4:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Beach Trip",
    time: "4:00 PM to 6:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const EventCalendar = () => {
  const [value, onChange] = useState<Value>(null);

  useEffect(() => {
    onChange(new Date());
  }, []);

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src={"/moreDark.png"} height={20} width={20} alt={""} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-md border border-gray-100 border-t-4 odd:border-t-devanshSky even:border-t-devanshPurple"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-md text-gray-600 font-semibold">
                {event.title}
              </h1>
              <span className="text-xs text-gray-300">{event.time}</span>
            </div>
            <p className="text-sm mt-2 text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
