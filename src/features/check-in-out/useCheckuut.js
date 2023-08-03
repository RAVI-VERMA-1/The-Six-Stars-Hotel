import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useCheckout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      // console.log(data);
      toast.success(`Booking # ${data?.id} is successfully checked-out `);
      queryClient.invalidateQueries({
        active: true,
        // queryKey: ["checked-in"],
      });
      // navigate("/");
    },
    onError: () => {
      toast.error("Booking status couldn't be changed");
    },
  });

  return { checkout, isCheckingout };
}

export default useCheckout;
