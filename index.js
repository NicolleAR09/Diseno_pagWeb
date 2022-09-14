const express = require('express');    

 const app = express();

app.get('/', (req, res) => res.send('Hello World from Express!'))

//Llamado HTML
app.get('/',(req,res)=>{    
    res.sendFile('/index2.html')
})

app.listen(8000);
console.log('Server on port 8000')

