import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuthentication";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["login"],
  //     queryFn: login,
  //   });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLogingin } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      // console.log(user);
      queryClient.setQueryData(["user"], user.user);
      toast.success("login Successful");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("email or password is wrong");
    },
  });

  return { login, isLogingin };
}

export default useLogin;
