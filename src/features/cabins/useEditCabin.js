import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createEditCabin as createEditCabinAPI,
  createEditCabin as createEditCabinApi,
} from "../../services/apiCabins";
function useEditCabin() {
  const queryClient = useQueryClient();
  const {
    isLoading: isEditing,

    mutate: editCabin,
  } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabinAPI(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully 🏡");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editCabin };
}

export default useEditCabin;
