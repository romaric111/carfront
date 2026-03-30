import DialogContent from "@mui/material/DialogContent";
import type { Car } from "../types";

type DialogFormProps = {
  car: Car;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Brand"
          name="brand"
          value={car.brand}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Model"
          name="model"
          value={car.model}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Color"
          name="color"
          value={car.color}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Registration Number"
          name="registrationNumber"
          value={car.registrationNumber}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Model Year"
          name="modelYear"
          value={car.modelYear}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Price"
          name="price"
          value={car.price}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}

export default CarDialogContent;
