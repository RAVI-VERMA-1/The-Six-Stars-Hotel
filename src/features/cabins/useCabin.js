import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
function useCabin() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({ queryKey: ["cabin"], queryFn: getCabins });

  return { cabins, isLoading, error };
}

export default useCabin;
