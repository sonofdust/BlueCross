import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
interface HeaderProps {
  onLogin: (email: string, password: string) => void;
}

const Header: React.FC<HeaderProps> = ({onLogin}) => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleemailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async () => {
    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        localStorage.setItem(
          "token",
          response.data.token ? response.data.token : ""
        );
      })
      .catch((error) => {
        console.log(error);
        localStorage.setItem("token", "");
      });

    // localStorage.setItem(
    //   "token",
    //   response.data.token ? response.data.token : ""
    // );
    //    onLogin(email, password);
    setShowModal(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-around">
      <h2>Blue Cross Blue Shield</h2>
      <Button variant="contained" onClick={handleLoginClick}>
        Login
      </Button>
      <Dialog
        open={showModal}
        onClose={handleModalClose}
        aria-labelledby="login-dialog-title"
      >
        <DialogTitle id="login-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            value={email}
            onChange={handleemailChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleLoginSubmit} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
