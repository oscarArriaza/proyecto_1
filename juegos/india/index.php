<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            India
        </title>
    </head>
    <body>
        <?php
            session_start();
            if(isset($_SESSION["usuario"]))
            {
        ?>
                <!--Aca pone TODO el codigo de tu juego-->
                <form action="./php/insertarPuntuacion.php" method="post">
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
                    <input type="text" id="puntuacion" name="Puntuacion" value=5>
                    <br>
                    <br>
                    <input type="submit" name="Enviar" id="enviar" value="Enviar">
                </form>
        <?php
            }
            else
            {
                header("Location:./index.php");
                exit();
            }
        ?>
    </body>
</html>