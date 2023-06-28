import React, {useState, useEffect, useContext} from "react";
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
//import {UserContext} from "../contexts/LoginContext";
import {ExpireContext} from "../contexts/ExpirationContext";
import checkExpireJWT from "../service/checkExpire";
import logOut from "../service/logOut";
//import {setSyntheticLeadingComments} from "typescript";

const Header = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Expire = useContext(ExpireContext);

  //  const {user, setUser} = useContext(UserContext);
  //  const [auth, setAauth] = useState(user.isAuthenticated);
  //aconst []
  useEffect(() => {}, []);
  //  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [showModal, setShowModal] = useState(false);
  //const [emailHelper, setEmailHelper] = useState("");

  const handleemailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    // setUser({
    //   email: event.target.value,
    //   password: user.password,
    // });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setEmail(value);
    // valid = emailPattern.test(value);
    // setEmailHelper(!valid ? "Invalid Email" : "");
    setPassword(event.target.value);
    // setUser({
    //   email: user.email,
    //   password: event.target.value,
    // });
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
        Expire?.setIsExpired(checkExpireJWT());
        // setUser({
        //   email: user.email,
        //   password: user.password,
        // });
      })
      .catch((error) => {
        console.log(error);
        // localStorage.setItem("token", "");
        // setUser({
        //   email: user.email,
        //   password: user.password,
        // });
      });
    setShowModal(false);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-around">
      <h2>Blue Cross Blue Shield</h2>
      {Expire?.isExpired ? (
        <Button variant="contained" onClick={() => setShowModal(true)}>
          Login
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={() => Expire?.setIsExpired(logOut())}
        >
          LogOut
        </Button>
      )}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
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
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleLoginSubmit} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
