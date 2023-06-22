import React, {useState, useEffect} from "react";
import {Button, List, ListItem, ListItemText} from "@mui/material";
import axios from "axios";
// const userListData = [
//   {
//     id: 7,
//     email: "michael.lawson@reqres.in",
//     first_name: "Michael",
//     last_name: "Lawson",
//     avatar: "https://reqres.in/img/faces/7-image.jpg",
//   },
//   {
//     id: 8,
//     email: "lindsay.ferguson@reqres.in",
//     first_name: "Lindsay",
//     last_name: "Ferguson",
//     avatar: "https://reqres.in/img/faces/8-image.jpg",
//   },
//   {
//     id: 9,
//     email: "tobias.funke@reqres.in",
//     first_name: "Tobias",
//     last_name: "Funke",
//     avatar: "https://reqres.in/img/faces/9-image.jpg",
//   },
//   {
//     id: 10,
//     email: "byron.fields@reqres.in",
//     first_name: "Byron",
//     last_name: "Fields",
//     avatar: "https://reqres.in/img/faces/10-image.jpg",
//   },
//   {
//     id: 11,
//     email: "george.edwards@reqres.in",
//     first_name: "George",
//     last_name: "Edwards",
//     avatar: "https://reqres.in/img/faces/11-image.jpg",
//   },
//   {
//     id: 12,
//     email: "rachel.howell@reqres.in",
//     first_name: "Rachel",
//     last_name: "Howell",
//     avatar: "https://reqres.in/img/faces/12-image.jpg",
//   },
// ];

const Crud = () => {
  const [users, setUsers] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [data, setData] = useState<
    {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    }[]
  >([]);

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
        setData(data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    // Perform edit operation
    // ...
  };

  const handleDeleteUser = (user: any) => {
    setUsers((prevUsers: any) =>
      !!prevUsers ? prevUsers.filter((u: any) => u.id !== user.id) : null
    );
    // Perform delete operation
    // ...
  };

  return (
    <div>
      <List>
        {!!data
          ? data.map((user: any) => (
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
    </div>
  );
};

export default Crud;
