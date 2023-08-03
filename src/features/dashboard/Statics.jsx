import TodayActivities from "../check-in-out/TodayActivity";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Statics({ bookings, confirmedStays }) {
  // console.log(confirmedStays);
  // 1.Number of Bookings--
  const numBookings = bookings.length;

  //   2.Total Sales--
  const sales = bookings.reduce((acc, item) => (acc += item.totalPrice), 0);

  //   3. Checkins----
  const checkins = confirmedStays?.length;
  return (
    <>
      <Stat
        title="total Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />

      <Stat
        title="Checkins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />

      {/* <Stat
        title="Occupacy Rate"
        color="blue"
        icon={<HiOutlineChartBar />}
        value={numBookings}
      /> */}
      <TodayActivities />
    </>
  );
}

export default Statics;
