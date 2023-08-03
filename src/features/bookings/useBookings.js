import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
function useBookings() {
  const [searchParams] = useSearchParams();
  // filter
  const filterValue = searchParams?.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // sortyby
  // const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const sortedValue = searchParams?.get("sortby") || "start_at-desc";
  const [field, direction] = sortedValue?.split("-");

  const sortBy = { field, direction };
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}

export default useBookings;
