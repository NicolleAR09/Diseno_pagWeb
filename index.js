const express = require('express');    

 const app = express();

app.get('/', (req, res) => res.send('Hello World from Express!'))

app.listen(8000);
console.log('Server on port 8000')

//Llamado HTML
app.get('/',(req,res)=>{    
    res.sendFile(__dirname+'/index2.html')
})