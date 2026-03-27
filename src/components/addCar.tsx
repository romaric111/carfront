import dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { Car } from "../types";

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });

  //open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  //close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return <></>;
}

export default AddCar;
