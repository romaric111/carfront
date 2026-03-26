import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api/carapi";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

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
];

function Carlist() {
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
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._links.self.href}
      />
    );
  }
}

export default Carlist;
