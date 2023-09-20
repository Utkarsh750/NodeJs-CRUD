const requestBodyParser = require("../util/bodyParser");
const writeToFile = require("../util/write-to-files");
const crypto = require("crypto"); //to generate uu id
module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
      console.log("Request body", body);
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "aplication/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "aplication/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};
