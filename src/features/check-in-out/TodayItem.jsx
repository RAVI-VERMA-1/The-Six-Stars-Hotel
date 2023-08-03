import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CheckedoutButton from "./CheckoutButton";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 1fr 10rem 5rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="blue">Arriving</Tag>}
      {status === "checked-in" && <Tag type="green">Departing</Tag>}
      {<Guest>{guests.fullName}</Guest>}
      <div>{numNights} nights stay</div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckedoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
