import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Statics from "./Statics";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
  const { confirmedStays, stays, isLoading: isStaysLoading } = useRecentStays();
  if (isBookingsLoading) return <Spinner />;
  // console.log(bookings, confirmedStays);

  return (
    <StyledDashboardLayout>
      <Statics bookings={bookings} confirmedStays={confirmedStays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
