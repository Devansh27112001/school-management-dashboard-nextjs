"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { log } from "console";

const localizer = momentLocalizer(moment);

const BigCalender = ({
  data,
}: {
  data: {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
  }[];
}) => {
  console.log(data);
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      min={new Date(2025, 10, 1, 8, 0, 0)}
      max={new Date(2025, 10, 1, 17, 0, 0)}
      onView={handleOnChangeView}
    />
  );
};

export default BigCalender;
