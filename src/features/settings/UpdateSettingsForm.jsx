import Form from "../../ui/Form";
// import FormRow from '../../ui/FormRow';
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import { styled } from "styled-components";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSettings";
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxGuestsPerBooking,
      maxBookingLength,
      minBookingLength,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleBlur(e, field) {
    const { value } = e.target;
    // console.log(value);

    if (!value) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow>
        <Label>Minimum nights/booking</Label>
        <Input
          type="number"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, "minBookingLength")}
          disabled={isUpdating}
          id="min-nights"
        />
      </FormRow>
      <FormRow>
        <Label>Maximum nights/booking</Label>
        <Input
          type="number"
          onBlur={(e) => handleBlur(e, "minBookingLength")}
          disabled={isUpdating}
          defaultValue={minBookingLength}
          id="max-nights"
        />
      </FormRow>
      <FormRow>
        <Label>Maximum guests/booking</Label>
        <Input
          type="number"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleBlur(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          id="max-guests"
        />
      </FormRow>
      <FormRow>
        <Label>Breakfast price</Label>
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isUpdating}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
