const requestBodyParser = require("../util/bodyParser");
const writeToFiles = require("../util/write-to-files");
module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1); //this is for specific uu id
  // console.log(baseUrl)
  let id = req.url.split("/")[3];
  // console.log(id)
  // if we want to check the valid uu id or not we will first crwate a RegexV4
  const regexV4 = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  );

  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "aplication/json" });
    res.end(
      JSON.stringify({ title: "Validation failed", message: "uuid not valid" })
    );
  } else if(baseUrl === "/api/movies/" && regexV4.test(id)){
    try{
        let body =  await requestBodyParser(req)
        const index = req.movies.findIndex((movie) => {
          return movie.id === id;
        });
        if (index === -1) {
          res.statusCode = 404;
          res.write(
            JSON.stringify({ title: "Not Found", message: "Movie not found" })
          );
          res.end();
        } else{
          req.movies[index] = { id , ...body }
          writeToFiles(req.movies)
          res.writeHead(200 , { "Content-Type": "applicatiojnh/json" })
          res.end(JSON.stringify(req.movies[index]))
        }
    } catch(err){
        console.log(err)
        res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not valid",
        })
      );
    }
  }
  else{
    res.writeHead( 404, { "Content-Type": "aplication/json" })
    res.end(JSON.stringify({ title: "Not found", message : "Route not found" }))
}
}