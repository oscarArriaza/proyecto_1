<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Style CSS -->
<link rel="stylesheet" href="style.css"></link>
<!-- FONT-AWESOME -->
<script src="https://kit.fontawesome.com/f1d3ec1e99.js" crossorigin="anonymous"></script>
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" 
integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- Animation.css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<title>India Game now</title>

</head>

<body>
<?php
         session_start();
        if(isset($_SESSION["usuario"]))
       {
        include("../../php/conexion.php");
        $id=$_SESSION["id"];
        $seleccionar="SELECT juegos_desbloqueados FROM `usuarios` WHERE id=$id;";
        $preparedStatements=$conexion->prepare($seleccionar);
        $preparedStatements->execute();
        $registros=$preparedStatements->fetchAll();
        $conexion=null;
        $nuevoJuegoDesbloqueado=$registros[0]["juegos_desbloqueados"];
        $_SESSION["juegosDesbloqueados"]=$nuevoJuegoDesbloqueado;
        if($_SESSION["juegosDesbloqueados"]===4)
        {
    ?>
  <ul class="nav justify-content-end" id="menu"  style="display:none">
    <div class="opciones">
            <div id="contador" style="display:none" class="contador">
              <i class="fa-solid fa-hourglass-half fa-bounce" ><span id="tiempo" >60</span></i> 
            </div>
            <button id="botonReiniciar" onclick="reiniciarJuego()" style="display:none" class="botonReiniciar"> 
              <i class="fa-solid fa-rotate-right fa-flip-horizontal"></i>
            </button>
            <button id="botonSalir" onclick="confirmarSalida()" style="display:none" class="botonSalir"> 
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
     </div>
    
  </ul>



  <div class="container-fluid " id="contenedor">
    <div class="juego" id="juego">
       <div class="tablero" id="tablero"></div>
       <button onclick="iniciarJuego('facil')" class="boton" id="botonFacil">Jugar</button> 
       <script src="app.js" charset="utf-8"></script>   
    </div>     
  </div>

  <form action="../../php/insertarPuntuacion.php" method="post" id="formularioPuntaje">
                    <label for="juego">
                        Juego:
                    </label>
                    <input type="text" id="juego" name="Juego" value=4 readonly>
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
                    <input type="submit" name="Enviar" id="enviar" value="Enviar">
    </form>

    <?php
            }
            else
            {
              header("Location:../../index.php");
              exit();
            }
         }
         else
         {
           header("Location:../../index.php");
           exit();
         }
    ?>
</body>
</html>