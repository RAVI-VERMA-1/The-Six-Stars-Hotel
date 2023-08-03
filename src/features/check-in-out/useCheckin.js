import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingin } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      // console.log(data);
      toast.success(`Booking # ${data?.id} is successfully checked-in `);
      queryClient.invalidateQueries({
        active: true,
        // queryKey: ["checked-in"],
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Booking status couldn't be changed");
    },
  });

  return { checkin, isCheckingin };
}

export default useCheckin;
