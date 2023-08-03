import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,

    mutate: deleteCabin,
  } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Deletion Successfull");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
