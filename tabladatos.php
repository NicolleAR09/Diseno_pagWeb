<?php
    //conexion base de datos phpmyadmin
    $conexion=mysqli_connect('localhost','root','','gpsdata');

    //consulta
    $gps="SELECT * FROM gpsdata";


?>

<center><h1>Proyecto 1</h1></center>
<center><h3>Información del GPS</h3></center>
<center><table  width="70%">
       <tr align=center>
        <td><b>Latitud</b></td>
        <td><b>Longitud</b></td>
        <td><b>Date</b></td>
        <td><b>Time</b></td>
       </tr>

        <?php 
        $coordenadas=mysqli_query($conexion, $gps);
        while($row=mysqli_fetch_assoc($coordenadas))
        
        {      if (mysqli_num_rows($coordenadas)>0){
            $ultimo=mysqli_fetch_all($coordenadas, MYSQLI_ASSOC);
            $count=count($ultimo);
            for ($j=0; $j<$count; ++$j){
                if ($j == $count-1){
                  $a = $ultimo[$j];
                  $lat =  $ultimo[$j]["Latitud"];
                  $lon =  $ultimo[$j]["Longitud"];
                  $dat =  $ultimo[$j]["Date"];
                  $time =  $ultimo[$j]["Time"];
                  //print_r($ultimo[$j]["Latitud"]);
  
                
                }
            };
        }    ?>
        
       <tr align=center>
        <td><?php echo $lat; ?></td>
        <td><?php echo $lon; ?></td>
        <td><?php echo $dat; ?></td>
        <td><?php echo $time; ?></td>
       </tr>

       


       <?php 
      //Seleccionar ultimo dato 
      //$sqlultimo=mysqli_query($conexion, "SELECT * FROM gpsdata")
   
    } ?>


    </table></center>

