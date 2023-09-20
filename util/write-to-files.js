const fs = require("fs")
const path = require("path")

module.exports = (data) => {
    console.log("the at to write the file is:" , data)
    try {
    fs.writeFileSync(path.join  // we have a path of our file which we want to have
        ( __dirname , ".." ,  "data", "movies.json"),  JSON.stringify(data),  "utf-8" )
        
    } catch (err) {
        console.log(err)
    }
}