import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createEditCabin } from "../../services/apiCabins";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ editToCabin = {}, onCloseModal }) {
  const queryClient = useQueryClient();
  const { id: editID, ...editValues } = editToCabin;
  const isEditSession = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // errors && console.log(errors);

  // const {
  //   isLoading: isCreating,

  //   mutate: createCabin,
  // } = useMutation({
  //   mutationFn: (newCabin) => createEditCabin(newCabin),
  //   onSuccess: () => {
  //     toast.success("Cabin Created Successfully 🏡");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //     reset();
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isGroupLoading = isCreating || isEditing;
  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: editID },
        {
          onSuccess: (data) => {
            // console.log(data);
            // reset();
            onCloseModal();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            // console.log(data);
            reset();
            onCloseModal();
          },
        }
      );
  }
  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          disabled={isGroupLoading}
          id="name"
          {...register("name", {
            required: "This field is required my friend",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          disabled={isGroupLoading}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required my friend",
            min: {
              value: 1,
              message: "Capacity must be greater than 1 my friend",
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          disabled={isGroupLoading}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required my friend",
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isGroupLoading}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required my friend",
            validate: (value) =>
              getValues().regularPrice > value || "Please Enter valid discount",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for The Cabin</Label>
        <Textarea
          type="number"
          id="description"
          disabled={isGroupLoading}
          defaultValue=""
          {...register("description", {
            required: "This field is required my friend",
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>

        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession
              ? false
              : "This field is required my friend",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isGroupLoading}>
          {isEditSession ? "Save changes" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
