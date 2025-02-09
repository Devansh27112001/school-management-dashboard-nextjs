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
const EventList = () => {
  return (
    <>
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
      ;
    </>
  );
};

export default EventList;
