 const express = require('express');    
 const path = require("path");

 const app = express();

//app.get('/', (req, res) => res.send('Hello World from Express!'))

app.get("/paginaWeb", (req, res) => {
    console.log(__dirname) 
    res.sendFile(path.join(__dirname + "/paginaweb.html"));
  });


//-----------------------------------------------------------------------

app.listen(8000);
console.log('Server on port 8000')