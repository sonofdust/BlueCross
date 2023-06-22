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

app.get("/users", async (req, res) => {
  // Verify JWT token
  await security.Validate(req, res);
  //****************************************************************************************** */
  external.getUsers(res);
  //****************************************************************************************** */
});

app.listen(PORT, () => {
  console.log(`Authentication backend is running on port ${PORT}`);
});
