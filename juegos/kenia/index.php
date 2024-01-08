<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style/estilos.css">
        <script src="./js/generarEntorno.js"></script>
        <script src="./js/moverPersonajeYDetectarColision.js"></script>
        <title>
            Kenia
        </title>
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
            if($_SESSION["juegosDesbloqueados"]>=3)
            {
    ?>
                <audio src="./media/musica/losBaldiosOst.mp3" hidden autoplay loop></audio>
                <audio src="./media/dialogos/linea1.mp3" id="linea1"></audio>
                <audio src="./media/dialogos/linea2.mp3" id="linea2"></audio>
                <audio src="./media/dialogos/linea3.mp3" id="linea3"></audio>
                <audio src="./media/dialogos/linea4.mp3" id="linea4"></audio>
                <audio src="./media/dialogos/linea5.mp3" id="linea5"></audio>
                <audio src="./media/dialogos/linea6.mp3" id="linea6"></audio>
                <audio src="./media/dialogos/linea7.mp3" id="linea7"></audio>
                <audio src="./media/dialogos/linea8.mp3" id="linea8"></audio>
                <audio src="./media/dialogos/linea9.mp3" id="linea9"></audio>
                <audio src="./media/dialogos/linea10.mp3" id="linea10"></audio>
                <audio src="./media/dialogos/linea11.mp3" id="linea11"></audio>
                <audio src="./media/dialogos/linea12.mp3" id="linea12"></audio>
                <audio src="./media/dialogos/linea13.mp3" id="linea13"></audio>
                <audio src="./media/dialogos/linea14.mp3" id="linea14"></audio>
                <audio src="./media/dialogos/linea15.mp3" id="linea15"></audio>
                <audio src="./media/dialogos/linea16.mp3" id="linea16"></audio>
                <audio src="./media/dialogos/linea17.mp3" id="linea17"></audio>
                <audio src="./media/dialogos/linea18.mp3" id="linea18"></audio>
                <div>
                    <a href="../../index.php">
                        <input type="button" value="atras">
                    </a>
                    <label id="mision"></label>
                </div>
                <div id="contenedorPrincipal"></div>

                <dialog id="dialogo" modal tabindex="2" style="width: 630px;">
                    <div style="border:solid black;">
                        <div style="border:solid red;">
                            <div style="border:solid green;">
                                <img src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png" id="retratoDeLaia" width="300px" height="300px">
                                <img src="./media/imagenes/imagenesPersonajesSecundarios/malikPokot/malikHablando.gif" id="retratoDeMalik" width="300px" height="300px">
                                <p id="parrafoDeDialogoEntreLosPersonajes">
                                    Saludos extranjera, mi nombre es Malik Pokot, soy el jefe de este pueblo llamado Langu. ¿Que te trae a Kenia?
                                </p>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="dialogo2" modal tabindex="2">
                    <div style="border:solid black;">
                        <div style="border:solid red;">
                            <div style="border:solid green; width: 610px;">
                                <img src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png" id="retratoDeLaia2" width="300px" height="300px">
                                <img src="./media/imagenes/imagenesPersonajesSecundarios/matu/matuHablando.gif" id="retratoDeMatu" width="300px" height="300px">
                                <p id="parrafoDeDialogoEntreLosPersonajes2">
                                    Saludos extranjera.
                                </p>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="dialogo4" modal tabindex="2">
                    <div style="border:solid black;">
                        <div style="border:solid red;">
                            <div style="border:solid green; width: 610px;">
                                <img src="./media/imagenes/imagenesPersonajesSecundarios/morani/moraniHablando.gif" id="retratoDeMorani" width="300px" height="300px">
                                <img src="./media/imagenes/imagenesPersonajePrincipal/retratoLaiaIzquierda.png" id="retratoDeLaia3" width="300px" height="300px">
                                <p id="parrafoDeDialogoEntreLosPersonajes3">
                                    Saludos Laia, me llamo Morani, Matu me aviso que vendrias, ya prepare el panel para que podas configurarlo.
                                </p>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="dialogo5" modal tabindex="2">
                    <div style="border:solid black;">
                        <div style="border:solid red;">
                            <div style="border:solid green; width: 610px;">
                                <img src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png" id="retratoDeLaia4" width="300" height="300">
                                <img src="./media/imagenes/imagenesPersonajesSecundarios/kiano/kianoHablando.gif" id="retratoDeKiano" width="300" height="300">
                                <p id="parrafoDeDialogoEntreLosPersonajes4">
                                    Hola Laia, soy Kiano, ya prepare el panel para que podas configurarlo.
                                </p>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="dialogo6" modal tabindex="2">
                    <div style="border:solid black;">
                        <div style="border:solid red;">
                            <div style="border:solid green; width: 400px;">
                                <form action="../../php/insertarPuntuacion.php" method="post" id="formularioPuntuacion" hidden>
                                    <label for="juego">
                                        Juego:
                                    </label>
                                    <input type="text" id="juego" name="Juego" value=3 readonly>
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
                                    <input type="text" id="puntuacion" name="Puntuacion">
                                    <br>
                                    <br>
                                    
                                </form>
                                <h1 style="text-align: center;" id="h1Puntaje"></h1>
                                <div style="text-align: center;">
                                    <input type="submit" name="Enviar" id="enviar" value="Salir" form="formularioPuntuacion">
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </dialog>

                <dialog id="dialogo3" modal tabindex="2">
                    <div style="border:solid black;">
                        <div style="border:solid red;">
                            <div style="border:solid green; width: 680px;">
                                <p id="enunciado"></p>
                                <div>
                                    <img src="" id="grafico">
                                </div>
                                <fieldset>
                                    <legend>
                                        Selecciona la respuesta correcta:
                                    </legend>
                                    <input type="radio" id="radio0" class="radio" name="respuesta" value="">
                                    <label for="radio0" id="labelRadio0"></label>
                
                                    <input type="radio" id="radio1" class="radio" name="respuesta" value="">
                                    <label for="radio1" id="labelRadio1"></label>
                
                                    <input type="radio" id="radio2" class="radio" name="respuesta" value="">
                                    <label for="radio2" id="labelRadio2"></label>
                
                                    <input type="radio" id="radio3" class="radio" name="respuesta" value="">
                                    <label for="radio3" id="labelRadio3"></label>
                
                                    <input type="radio" id="radio4" class="radio" name="respuesta" value="">
                                    <label for="radio4" id="labelRadio4"></label>
                                </fieldset>
                                <p id="mensajeValidacionRespuesta" style="color: red;"></p>
                                <input type="button" value="Enviar respuesta" id="enviarRespuesta" autofocus>
                                <label for="enviarRespuesta" id="cronometro">Tiempo transcurrido: 0:0</label>
                                <p id="mensajeRespuestaCorrecta"></p>
                            </div>
                        </div>
                    </div>
                </dialog>
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