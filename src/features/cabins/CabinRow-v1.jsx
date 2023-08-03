import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/ 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  display: flex;
  gap: 3px;
  /* background-c */
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
  display: flex;
  gap: 3px;
  background-color: var(--color-grey-0);
`;
function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} Guests</div>
      <Price>
        <p>&#8377;</p>
        <p>{regularPrice}</p>
      </Price>
      {discount ? (
        <Discount>
          <p>&#8377;</p>
          <p>{discount}</p>
        </Discount>
      ) : (
        "-"
      )}
      <div>
        <Modal>
          <Modal.Open opens="edit">
            {/* <button onClick={() => setShowForm(true)}> */}
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm editToCabin={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete">
            <button disabled={isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinID)}
              onCloseModal={close}
            />
          </Modal.Window>
        </Modal>

        {/* <Menus.Menu>
          <Menus.Toggle id={cabinID} />
          <Menus.List id={cabinID}>
            <Menus.Button icon={<HiPencil />}>DELETE</Menus.Button>
            <Menus.Button icon={<HiTrash />}>EDIT</Menus.Button>
          </Menus.List>
        </Menus.Menu> */}
      </div>
    </Table.Row>
  );
}

export default CabinRow;
