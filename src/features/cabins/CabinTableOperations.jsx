import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No-Discount" },
          { value: "with-discount", label: "with-Discount" },
        ]}
      />
      <Sortby
        options={[
          {
            value: "name-asc",
            label: "Sort by Name (A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort by Name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by Price {Low First}",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by Price {High First}",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by Capacity {Low First}",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Capacity {High First}",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
