import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createEditCabin as createEditCabinAPI,
  createEditCabin as createEditCabinApi,
} from "../../services/apiCabins";
import { updateCurrentUser } from "../../services/apiAuthentication";
function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,

    mutate: updateUser,
  } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("Your Account is Updated 🏡");
      //   queryClient.setQueryData("user", user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateUser };
}

export default useUpdateUser;
