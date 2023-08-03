import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    isLoading: isUpdating,

    mutate: updateSetting,
  } = useMutation({
    mutationFn: (newSetting) => updateSettingAPI(newSetting),
    onSuccess: () => {
      toast.success("Settings Successfully Changed ✅");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSetting };
}

export default useUpdateSetting;
