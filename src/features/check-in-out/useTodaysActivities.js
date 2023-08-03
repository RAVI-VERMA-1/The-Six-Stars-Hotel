import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodaysActivities() {
  const { isLoading, data: stays } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });
  // console.log(stays);
  return { stays, isLoading };
}
export default useTodaysActivities;
