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
   
  	<title>Juego Rompecabezas - Bienvenidos -</title>
</head>
<body>
    <?php
        session_start();
        if(isset($_SESSION["usuario"]))
        {
    ?>
            <div class="BarraInformacion mt-5 d-flex justify-content-around">
                <h2 style="color: rgb(255, 254, 252)">Aprende sobre las <span style="color: rgb(32, 204, 201);">energías</span> renovables</h2>
            </div>

            <div class="contenedor mt-5">
                <video id="videoPresentacion" autoplay loop>
                    <source src="assets/media/bienvenides.mp4" type="video/mp4">
                </video>      
            </div>

            <div class="BarraInformacion1 mt-5 d-flex justify-content-around ">
                <a  id="BarraInformacion2"  href="solar.php" style="text-decoration: none; color: rgb(36, 97, 96);">
                    <h2 style="color: rgb(255, 254, 252)">Vamos a Jugar</h2>
                </a>
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





