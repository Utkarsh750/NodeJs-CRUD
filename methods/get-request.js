// module.exports = (req , res) => {
//     let baseUrl = req.url.substring(0 , req.url.lastIndexOf("/") + 1) //this is for specific uu id
//     // console.log(baseUrl)
//     let id = req.url.split("/")[3]
//     // console.log(id)
//     // if we want to check the valid uu id or not we will first crwate a RegexV4
//     const regexV4 =  new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)

//     if(req.url === "/api/movies"){
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "aplication/json")
//         res.write(JSON.stringify(req.movies))
//         res.end()
//     }
//     else if(!regexV4.test(id)){
//         res.writeHead( 400, { "Content-Type": "aplication/json" })
//         res.end(JSON.stringify({ title: "Validation failed", message : "uuid not valid" }))
//     }
//     else if(baseUrl === "/api/movies/" &&  regexV4.test(id)){
//         // res.statusCode = 200
//         res.setHeader("Content-Type", "aplication/json")
//         let filteredMovie = req.movies.filter((movie) => {
//             return movie.id === id
//         })
//         if(filteredMovie.length > 0){
//             res.statusCode = 200
//             res.write(JSON.stringify(filteredMovie))
//             res.end()
//         }
//         else{
//             res.statusCode = 404
//             res.write(JSON.stringify({ title: "Not found", message : "Movie not found" }))
//             res.end()
//         }

//     }
//     else{
//         res.writeHead( 404, { "Content-Type": "aplication/json" })
//         res.end(JSON.stringify({ title: "Not found", message : "Route not found" }))
//     }
// }

module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    res.setHeader("Content-Type", "application/json");
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });

    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
