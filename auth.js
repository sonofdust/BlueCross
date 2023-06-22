const express = require("express");
const bodyParser = require("body-parser");
const CSecurity = require("./ExternalAPIs/CSecurity");
const CExternal = require("./ExternalAPIs/CExternal");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 3000;

//**  BUSINESS OBJECTS */
const security = new CSecurity();
const external = new CExternal();
//******************** */

// Mock user database

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: "$2b$10$9Rg7dW4thLJGZTkFZdUoVuACR8k1mc0wuavPSY4fVVv2//nBV94Ya",
  },
];
// Add more users as needed

// User login endpoint
app.post("/login", (req, res) => {
  security.LogIn(req, res);
});

// // User login endpoint
// app.post("/login", (req, res) => {
//   const {email, password} = req.body;

//   // Find user by username
//   const user = users.find((u) => u.email === email);
//   if (!user) {
//     return res.status(401).json({error: "Invalid email or password"});
//   }
//   //*****************************************************************************
//   //   bcrypt.hash(password, 10, (err, hash) => {
//   //     if (err) {
//   //       console.error(err);
//   //       return;
//   //     }
//   //     console.log("Hashed password:", hash);
//   //   });
//   //*****************************************************************************
//   // Compare password
//   bcrypt.compare(password, user.password, (err, result) => {
//     console.log(`RESULT:  ${result} ERROR: ${err}`);
//     if (err || !result) {
//       return res.status(401).json({error: "BCRYPT Invalid email or password"});
//     }
//     // Generate JWT token
//     const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: "1h"});
//     res.json({token});
//   });
// });

// app.get("/protected", (req, res) => {
//   // Verify JWT token

//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({error: "Authorization token missing"});
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({error: "Invalid token"});
//     }

//     // Token is valid
//     res.json({message: "Protected route accessed successfully", user: decoded});
//   });
// });

// const callUsersAPI = () => {
//   return new Promise((resolve, reject) => {
//     const options = {
//       hostname: "reqres.in",
//       path: "/api/users?page=2",
//       method: "GET",
//     };

//     const req = https.request(options, (res) => {
//       let data = "";

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         resolve(JSON.parse(data));
//       });
//     });

//     req.on("error", (error) => {
//       reject(error);
//     });

//     req.end();
//   });
// };

app.get("/users", async (req, res) => {
  // Verify JWT token
  await security.Validate(req, res);
  //****************************************************************************************** */
  external.getUsers(res);
  //   this.callUsersAPI()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((error) => {
  //       res.err(error);
  //     });
  //****************************************************************************************** */
});

app.listen(PORT, () => {
  console.log(`Authentication backend is running on port ${PORT}`);
});
