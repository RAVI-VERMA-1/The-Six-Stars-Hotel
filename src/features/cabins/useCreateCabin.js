import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
function useCreateCabin() {
  const queryClient = useQueryClient();
  const {
    isLoading: isCreating,

    mutate: createCabin,
  } = useMutation({
    mutationFn: (id) => createEditCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin Successfully created🏡");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
}

export default useCreateCabin;
