import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuthentication";
import { toast } from "react-hot-toast";
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (data) => {
      //   console.log(data);
      toast.success(
        "You Have successfully registered now verify your email address 🎉"
      );
    },
    // onError: () => {
    //   toast.error("Unable to register you");
    // },
  });
  return { signup, isLoading };
}
