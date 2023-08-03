import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,

    mutate: deleteBooking,
  } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Deletion Successfull");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
