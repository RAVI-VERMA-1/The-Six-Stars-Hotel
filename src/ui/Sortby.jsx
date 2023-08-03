import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function Sortby({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValueOfSortby = searchParams.get("sortby") || "";

  function handleChange(e) {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      value={currentValueOfSortby}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default Sortby;
