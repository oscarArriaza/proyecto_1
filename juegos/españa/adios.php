<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Rammetto+One&display=swap" rel="stylesheet"> 
	<script src="https://kit.fontawesome.com/f1d3ec1e99.js" crossorigin="anonymous"></script>
	
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

 <title>Mision Cumplida </title>
	</head>

    
    <body class="mt-5">
    <?php
      session_start();
      if(isset($_SESSION["usuario"]))
      {
  ?>
        <div class="BarraInformacion mt-5" >
            
            <div id="resultadoPuntaje"></div>


        </div>
        <div class="contenedor mt-5">
        
        
            <video id="videoPresentacion"  autoplay>
                <source src="assets/media/Adios.mp4" type="video/mp4">
            </video>
        
        
        </div>
    
        <?php
            if(isset($_SESSION["usuario"]))
            {
        ?>      <div hidden>
                    <form action="../../php/insertarPuntuacion.php" method="post" id="formularioPuntaje">
                        <label for="juego">
                            Juego:
                        </label>
                        <input type="text" id="juego" name="Juego" value=1 readonly>
                        <br>
                        <br>
                        <label for="id">
                            Id usuario:
                        </label>
                        <input type="text" id="id" name="Id" value=<?php echo $_SESSION["id"]?> readonly>
                        <br>
                        <br>
                        <label for="puntuacion">
                            Puntuacion:
                        </label>
                        <input type="text" id="puntuacion" name="Puntuacion" value="">
                        <br>
                        <br>
                        <!--<input type="submit" name="Enviar" id="enviar" value="Enviar">-->
                    </form>
                </div>
        <?php
            }
        ?>
        
<div class="BarraInformacion1 mt-5 d-flex justify-content-around ">
  
    <div>
        <button type="submit" style="color: rgb(255, 254, 252); background: none; border: none; padding: 0; font: inherit; cursor: pointer;">
          
        </button>
      <input type="submit" name="Enviar" id="enviar" value="Salir del Juego" form="formularioPuntaje">
      

    </div>
        

</div>

<script src="assets/js/script.js"></script>
  <?php
      }
      else
      {
          header("Location:../../index.php");
          exit();
      }
  ?>
        
    </body>
</html>