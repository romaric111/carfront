import { useState, type ChangeEvent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import CarDialogContent from "./CarDialogContent";
import type { Car, CarEntry, CarResponse } from "../types";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  cardata: CarResponse;
};

function EditCar({ cardata }: FormProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      //Car updated, refetch the cars
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });

  const handleClickOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntry: CarEntry = {
      car,
      url,
    };
    mutate(carEntry);
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    });
    setOpen(false);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setCar({
      ...car,
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
  }

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCar;
