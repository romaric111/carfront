import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Carlist from "./Carlist";
import Snackbar from "@mui/material/Snackbar";

type User = {
  username: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = () => {
    // Add login logic here
    axios
      .post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch(() => {
        setOpen(true);
      });
  };
  const handleLogout = () => {
    setAuth(false);
    sessionStorage.setItem("jwt", "");
  };

  return isAuthenticated ? (
    <Carlist logOut={handleLogout} />
  ) : (
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField name="username" label="Username" onChange={handleChange} />
      <TextField
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Login failed. Please check your credentials."
      />
    </Stack>
  );
}

export default Login;
