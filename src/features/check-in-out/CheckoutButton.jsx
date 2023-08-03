import Button from "../../ui/Button";
import useCheckuut from "./useCheckuut";
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckuut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
