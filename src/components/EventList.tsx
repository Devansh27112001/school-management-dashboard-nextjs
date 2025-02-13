import prisma from "@/lib/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return (
    <>
      {data.length ? (
        data.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-md border border-gray-100 border-t-4 odd:border-t-devanshSky even:border-t-devanshPurple"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-md text-gray-600 font-semibold">
                {event.title}
              </h1>
              <span className="text-xs text-gray-300">
                {event.startTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            <p className="text-sm mt-2 text-gray-400">{event.description}</p>
          </div>
        ))
      ) : (
        <div className="p-3 self-center text-sm text-gray-500">
          No events for this date
        </div>
      )}
    </>
  );
};

export default EventList;
