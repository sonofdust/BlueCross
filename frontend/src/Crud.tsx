import React, {useState, useEffect, useContext} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
//import checkExpire from "./service/checkExpire";

//import {useExpire} from "./contexts/ExpirationContext";
import {ExpireContext} from "./contexts/ExpirationContext";

const Crud = () => {
  const [users, setUsers] = useState<
    {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    }[]
  >([]);
  const Expire = useContext(ExpireContext);

  // const [edituser, setEditUser] = useState<{
  //   id: number;
  //   email: string;
  //   first_name: string;
  //   last_name: string;
  //   avatar: string;
  // }>();
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Function to fetch data from API
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/users",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const {data} = response.data;
        setUsers(data);
        //        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleEditSubmit = () => {
    console.log("XXXXXXXXXXXXXXX");
    setUsers(
      users.map((e: any) => {
        if (e.email === email) {
          e.first_name = firstName;
          e.last_name = lastName;
          e.avatar = avatar;
        }
        return e;
      })
    );

    setShowModal(false);
  };

  const handleEditUser = (user: any) => {
    //   console.log(user);
    setShowModal(true);
    //    setEditUser(user);
    setEmail(user.email);
    setAvatar(user.avatar);
    setFirstName(user.first_name);
    setLastName(user.last_name);
    //    console.log("EDITINT: ", edituser);
    // Perform edit operation
    // ...a
  };

  const handleDeleteUser = (user: any) => {
    // console.log(data);
    // setUsers(!!data ? data.filter((u: any) => u.id !== user.id) : null);

    setUsers((prevUsers: any) =>
      !!prevUsers ? prevUsers.filter((u: any) => u.id !== user.id) : null
    );

    //console.log(users);
    // Perform delete operation
    // ...
  };

  // function setShowModal(arg0: boolean): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div>
      {!Expire?.isExpired ? (
        <List>
          {!!users
            ? users.map((user: any) => (
                <ListItem key={user.id}>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                    secondary={user.email}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))
            : undefined}
        </List>
      ) : (
        <label>EXPIRED</label>
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
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Avatar"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Crud;
