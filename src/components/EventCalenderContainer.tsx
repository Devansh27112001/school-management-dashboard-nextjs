import { searchParamsType } from "@/lib/types";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import Image from "next/image";

const EventCalenderContainer = async ({
  searchParams,
}: {
  searchParams: searchParamsType;
}) => {
  const { date } = await searchParams;
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src={"/moreDark.png"} height={20} width={20} alt={""} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalenderContainer;
