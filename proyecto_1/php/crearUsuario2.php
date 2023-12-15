<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            Escribe un nombre
        </title>
        <script src="../js/administracionJs/validacionCrearUsuario.js"></script>
    </head>
    <body>
        <a href="./iniciarSesion.php">Atras</a> <!--Enlace a Sign In (iniciar sesion)-->
        <?php
            include("./conexion.php");
            session_start();
            if(isset($_SESSION["usuario"]))
            {
                header("location:../landingPage.php"); //Nos redirige a la Landing Page
                exit();
            }
            else
            {
                if(isset($_POST["Enviar"]))
                {
                    $nombreDeUsuario=$_POST["NombreDeUsuario"];
                    $elNombreYaExiste=false;
                    $seleccionar="SELECT nombre FROM `usuarios`;";
                    $preparedStatements=$conexion->prepare($seleccionar);
                    $preparedStatements->execute();
                    $registros=$preparedStatements->fetchAll();
                    $conexion=null;
                    foreach ($registros as $registro)
                    {
                        if($nombreDeUsuario===$registro["nombre"])
                        {
                            $elNombreYaExiste=true;
                        }
                    }
                    if($elNombreYaExiste)
                    {
                        echo "<p style='color:red;'>El nombre ya existe</p>";
                    }
                    else
                    {
                        include("./conexion.php");
                        $contrasenia=$_POST["ConfirmarContrasenia"];
                        $contraseniaCifrada=password_hash($contrasenia,PASSWORD_DEFAULT,array("cost"=>12));
                        $nivel=1;
                        $juegos_desbloqueados=1;
                        $consulta="INSERT INTO `usuarios`(`nombre`, `contrasenia`, `nivel`, `juegos_desbloqueados`) VALUES (:nombreDeUsuario,:contrasenia,:nivel,:juegos_desbloqueados)";
                        $preparedStatements=$conexion->prepare($consulta);
                        $preparedStatements->execute(array(":nombreDeUsuario"=>$nombreDeUsuario,":contrasenia"=>$contraseniaCifrada,":nivel"=>$nivel,":juegos_desbloqueados"=>$juegos_desbloqueados));
                        $preparedStatements->closeCursor();
                        $conexion=null;
                        echo "<p style='color:green;'>La cuenta fue creada exitosamente</p>";
                        header("location:./iniciarSesion.php");
                        exit();
                    }
                }
            }
        ?>
        <h1>
        Escribe un nombre
        </h1>
        <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
            <label for="nombreDeUsuario">
                Nombre de usuario
            </label>
            <input type="text" name="NombreDeUsuario" id="nombreDeUsuario" autofocus>
            <p id="mensajeValidacionNombreDeUsuario"></p>

            <label for="contrasenia" hidden>
                Contraseña
            </label>
            <input type="password" name="Contrasenia" id="contrasenia" value="contraseniaUsuario" readonly hidden>

            <label for="confirmarContrasenia" hidden>
                Confirmar contraseña
            </label>
            <input type="password" name="ConfirmarContrasenia" id="confirmarContrasenia" value="contraseniaUsuario" readonly hidden>

            <input type="submit" name="Enviar" value="Enviar" id="enviar">
        </form>
    </body>
</html>