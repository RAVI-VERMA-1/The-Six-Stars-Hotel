import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../../services/apiAuthentication";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}
export default useSignout;
