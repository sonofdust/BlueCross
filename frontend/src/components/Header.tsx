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

interface HeaderProps {
  onLogin: (username: string, password: string) => void;
}

const Header: React.FC<HeaderProps> = ({onLogin}) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = () => {
    onLogin(username, password);
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
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
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
