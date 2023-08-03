import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
function useBookingOnly() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookingOnly", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  // console.log(booking);
  return { booking, isLoading, error };
}

export default useBookingOnly;
