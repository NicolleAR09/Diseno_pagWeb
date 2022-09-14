const express = require('express');    

 const app = express();




app.listen(8000, ()=>console.log('Mi servidor está corriendo sobre el puerto 8000'))
// Contenido estático
//app.use(express.static(__dirname+'/index2.html'));

app.get('/', (req, res) =>{    
    res.sendFile(__dirname+'/index2.html')
})



//Llamado HTML
app.get('/index2',(req,res)=>{    
    res.sendFile(__dirname+'/index2.html')
})

//app.listen(8000);
//console.log('Server on port 8000')


