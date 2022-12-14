const express = require("express");
require("dotenv").config();

const app = express();

//-----------------------connection with database

const mysql = require("mysql");

DBConfig = {
    port: "3306",
    host: "database-1.csdupfcdilij.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "123456789",
    database: "gpsdata"
};

const connection = mysql.createConnection(DBConfig);
connection.connect((error) => {
    if (error) {
        console.log(error);
        connection.end();
    }
});

//---------------------------------------------------

const data = {
    Latitud: 0,
    Longitud: 0,
    Date: "00/00/00",
    Time: "00:00:00"
};
app.get("/data", (req, res) => {
    const json = JSON.stringify(data);
    return res.status(200).send(json);
});

//--------------------------------get info from the message
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("error", (err) => {
    console.log(`server error:\n${err.stack}`);
    socket.close();
});

socket.on("message", async (msg, senderInfo) => {
    console.log("Messages received " + msg);
    const infoMensaje = String(msg).split(",");
    insertData(infoMensaje);
    socket.send(msg, senderInfo.port, senderInfo.address, () => {
        console.log(`Message sent to ${senderInfo.address}:${senderInfo.port}`);
    });
});

socket.on("close", () => {
    console.log("Socket closed");
});

socket.on("listening", (req, res) => {
    const address = socket.address();
    console.log(`UDP server listening on: ${address.address}:${address.port}`);
});

//-------------------------------------------insert info to database
const insertData = (info) => {
    console.log("Inserting data", info);
    data.Latitud = info[0];
    data.Longitud = info[1];
    data.Timestamp = info[2];
    data.Car = info[3];
    

    const query = `INSERT INTO gpsdata (Latitud, Longitud, Timestamp, Car) VALUES ('${data.Latitud}', '${data.Longitud}','${data.Timestamp}', '${data.Car}')`;
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Register saved");
    });
    console.log("Received: ", data);
};

//-------------------------------------------Historic 1
app.get("/record", async (req, res) => {
    const stime = req.query.stime;
    const ftime = req.query.ftime;


    const query = `SELECT * FROM gpsdata WHERE Timestamp BETWEEN '${stime}' AND '${ftime}'`;
    connection.query(query, (err, result) => {
        if (!err) {
            return res.send(result).status(200);
        } else {
            console.log(`Ha ocurrido el siguiente ${err}`);
            return res.status(500);
        }
    });
});

//-------------------------------------------Historic 2
app.get("/pathg", async (req, res) => {
    try {
        const stime = req.query.stime;
        const ftime = req.query.ftime;
        const latid = parseFloat(req.query.latd);
        const longd = parseFloat(req.query.longd);

        const query = `SELECT * FROM gpsdata 
            WHERE Latitud BETWEEN ${longd-0.002} AND ${longd + 0.002} 
            AND Longitud BETWEEN ${latid-0.002} AND ${latid + 0.002}`;
    
            connection.query(query, (err, result) => {
                if (!err) {
                    return res.send(result).status(200);
                } else {
                    console.log(`Ha ocurrido el siguiente ${err}`);
                    return res.status(500);
                }
            });

    } catch (e) {
        console.error(e);
    }
});

//------------------------------------HISTORIC 2 PART 2

app.get("/prueba", async(req, res) =>{
    try {
        const stime = req.query.stime;
        const ftime = req.query.ftime;
        const latid = parseFloat(req.query.latd);
        const longd = parseFloat(req.query.longd);

        const query = `SELECT Timestamp FROM gpsdata 
        WHERE Latitud BETWEEN ${latid - 0.002} AND ${latid + 0.002} 
        AND Longitud BETWEEN ${longd - 0.002} AND ${longd + 0.002} 
        AND Timestamp BETWEEN '${stime}' AND '${ftime}' ORDER BY Timestamp DESC LIMIT 6`;

        connection. query(query, (err, result) => {
            if(!err) {
                console.log(result);
                return res.send(result).status(200);
            } else {
                console.log(`Ha ocurrido el siguiente ${err}`);
                return res.status(500);
            }
        });
        
    } catch (e) {
        console.error(e);
    }
});


//-----------------------------------------initializing server
app.use(express.static(__dirname + "/static"));
app.listen(8000, () =>
    console.log("Mi servidor est?? corriendo sobre el puerto 8000")
);

//----------------------------------------port from sniffer
socket.bind(8050).unref();

//SELECT * FROM gpsdata WHERE Latitud BETWEEN 0.0000 AND 0.0000 AND Longitud BETWEEN 0.0000 AND 0.0000
