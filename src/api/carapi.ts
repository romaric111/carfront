import axios from "axios";
import type { Car, CarResponse, CarEntry } from "../types";

const getAuthHeader = () => {
  const token = sessionStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, {
    headers: getAuthHeader(),
  });
  return response.data._embedded.cars;
};

export const deletecar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link, {
    headers: getAuthHeader(),
  });
  return response.data;
};
export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    },
  );
  return response.data;
};

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  return response.data;
};
