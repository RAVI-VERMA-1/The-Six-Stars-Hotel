import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  // console.log(cabins);
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  // console.log(cabins);
  if (!cabins?.length) return <Empty resourceName="Cabin" />;
  // 1.for filter
  let filterCabins;
  if (filterValue === "all") {
    // console.log(cabins);
    filterCabins = cabins;
  }

  if (filterValue === "with-discount") {
    // console.log(cabins);
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  if (filterValue === "no-discount") {
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  // 2.Sort
  const sortby = searchParams.get("sortby") || "start_at-asc";
  const [field, direction] = sortby.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table cols="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))} */}
        {/* Using a render prop pattern */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
