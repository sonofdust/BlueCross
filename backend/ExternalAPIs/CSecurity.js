const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

class CAuthenticate {}

class CSecurity {
  constructor() {
    // this.token = "";
    //***  TEST DATA TO BE REPLACED BY A DATABASE CALL */
    this.users = [
      {
        id: 1,
        email: "test@example.com",
        password:
          "$2b$10$9Rg7dW4thLJGZTkFZdUoVuACR8k1mc0wuavPSY4fVVv2//nBV94Ya",
      },
    ];
  }

  Validate(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({error: "Authorization token missing"});
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return await res.status(401).json({error: "Invalid token"});
      }
    });
  }

  LogIn(req, res) {
    const {email, password} = req.body;

    // Find user by username
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({error: "Invalid email or password"});
    }
    //*****************************************************************************
    //   bcrypt.hash(password, 10, (err, hash) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log("Hashed password:", hash);
    //   });
    //*****************************************************************************
    // Compare password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res
          .status(401)
          .json({error: "BCRYPT Invalid email or password"});
      }
      // Generate JWT token
      const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: "1h"});
      res.json({token: token});
    });
  }

  //   sayHello() {
  //     console.log(`Hello, ${this.name}!`);
  //   }
}

module.exports = CSecurity;
