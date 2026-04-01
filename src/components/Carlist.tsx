import {
  DataGrid,
  type GridColDef,
  type GridCellParams,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deletecar } from "../api/carapi";
import { useState } from "react";
import AddCar from "./addCar";
import EditCar from "./EditCar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

type CarlistProps = {
  logOut: () => void;
};

function Carlist({ logOut }: CarlistProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletecar,
    onSuccess: () => {
      setOpen(true);
      //Car deleted, refetch the cars
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    {
      field: "registrationNumber",
      headerName: "Registration Number",
      width: 150,
    },
    { field: "modelYear", headerName: "Model Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },

    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />,
    },

    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label="Delete"
          size="small"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`,
              )
            ) {
              mutate(params.row._links.car.href);
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const { data, error, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error when fetching cars...</span>;
  } else {
    return (
      <>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <AddCar />
          <Button variant="contained" onClick={logOut}>
            Logout
          </Button>
        </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          showToolbar
        />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Car deleted successfully"
        />
      </>
    );
  }
}

export default Carlist;
