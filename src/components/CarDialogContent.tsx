import DialogContent from "@mui/material/DialogContent";
import type { Car } from "../types";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type DialogFormProps = {
  car: Car;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "400px" }}>
          <TextField
            label="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <TextField
            label="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <TextField
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <TextField
            label="Registration Number"
            name="registrationNumber"
            value={car.registrationNumber}
            onChange={handleChange}
          />
          <TextField
            label="Model Year"
            name="modelYear"
            type="number"
            value={car.modelYear}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={car.price}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
    </>
  );
}

export default CarDialogContent;
