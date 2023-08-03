import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingOnly from "../bookings/useBookingOnly";
import useSettings from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBookingOnly();
  // const booking = {};
  const { settings, isLoading: isLoadingSettings } = useSettings();
  useEffect(() => setConfirmPaid(() => booking?.isPaid ?? false), [booking]);

  const { checkin, isCheckingin } = useCheckin();

  if (isLoading) return <Spinner />;
  // console.log("hello from checkin Booking");

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // console.log(settings);
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <CheckBox
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid((confirm) => false);
          }}
        >
          Want to add breakFast for {optionalBreakfastPrice}
        </CheckBox>
      </Box>
      <Box>
        <CheckBox
          disabled={confirmPaid || isCheckingin}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id={booking.id}
        >
          I confirm that the {booking.guests.fullName} has paid the hotel bill
          amount which was : {booking.totalPrice}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
