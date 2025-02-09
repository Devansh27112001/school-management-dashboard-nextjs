import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex flex-col gap-3 md:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="parent" />
          <UserCard type="teacher" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[410px]">
            <CountChartContainer />
          </div>
          {/* ATTENDENCE CHART */}
          <div className="w-full lg:w-2/3 h-[410px]">
            <AttendanceChartContainer />
          </div>
        </div>

        {/* BOTTOM CHARTS */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
