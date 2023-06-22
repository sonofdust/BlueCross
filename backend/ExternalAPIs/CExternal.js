const https = require("https");

class CExternal {
  constructor() {}

  #callUsersAPI() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "reqres.in",
        path: "/api/users?page=2",
        method: "GET",
      };

      const req = https.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      });

      req.on("error", (error) => {
        reject(error);
      });

      req.end();
    });
  }

  getUsers(res) {
    this.#callUsersAPI()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.err(error);
      });
  }
}

module.exports = CExternal;
