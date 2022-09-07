


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto 1</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
    crossorigin=""/>
</head>
<body onload="table();">
    <script type="text/javascript">
        function table(){
            const xhttp=new XMLHttpRequest();
            xhttp.onload=function(){
                document.getElementById("table").innerHTML=this.responseText;
            }
            xhttp.open("GET", "tabladatos.php");
            xhttp.send();
        }
        setInterval(function() {
            table();
        }, 500);
    </script>
    <div id="table">

    </div>

    <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
     integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
     crossorigin=""></script>
    <script src="map.js"></script>

    </body>
    </html>