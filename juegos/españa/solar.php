<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Rammetto+One&display=swap" rel="stylesheet"> 
  <script src="https://kit.fontawesome.com/f1d3ec1e99.js" crossorigin="anonymous"></script>
  <script src="assets/js/script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
     
  	<title>Juego Rompecabezas - Energía Solar -</title>
</head>
<body>
  <?php
      session_start();
      if(isset($_SESSION["usuario"]))
      {
  ?>
        <div class="BarraInformacion mt-5 d-flex justify-content-around">
          <div  id="timer"></div> 
          <img src="assets/images/reloj.png">
          <div style="color:#345675">
          <h2> Arma el Rompecabezas </h2>
        </div>

        <div onclick="confirmarSalida()"><i class="fa-solid fa-circle-xmark" style="color: #fc8d72;" ></i></div>
        </div>
        <div class="contenedor mt-5">
          <div class="contenedor-puzzle" id="contenedor-puzzle">
                  
                    
          </div>

          <div class="grilla" id="grilla">
                
          </div>       
        </div>

        <div class="BarraInformacion1 mt-5 d-flex justify-content-around " >
        <h2 style="color: rgb(255, 254, 252)">Arrastra las imágenes y <span style="color:#517290"> ordénalas </span> según
    corresponda</h2>

        </div>



        <div >
              <audio id="miAudio" class="miAudio" controls>
            <source src="assets/media/cute-creatures.mp3" type="audio/mpeg">
            Tu navegador no soporta la etiqueta de audio.
        </audio>
        <div>

            
        </div>
        </div>
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