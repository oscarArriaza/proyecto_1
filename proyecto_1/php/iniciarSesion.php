<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            Iniciar sesión
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="../style/estiloAdministracion.css"/>
        <script src="../js/administracionJs/validacionesInicioDeSesion.js"></script>
    </head>
    <body style="background-color:rgb(253,196,119);">
        <a href="../index.php">
            <button class="btn btn-success title" type="button" style="background-color:rgb(248,175,155);">
                Atras
            </button>
        </a>
        <?php
            include("./conexion.php");
            session_start();
            if(isset($_SESSION["usuario"]))
            {
                header("location:../index.php"); //Nos redirige a la Landing Page
                exit();
            }
            else
            {
                $accesoConcedido=false;
                if(isset($_POST["iniciarSesion"]))
                {
                    $usuario=htmlentities(addslashes($_POST["NombreDeUsuario"]));
                    $contrasenia=htmlentities(addslashes($_POST["Contrasenia"]));
                    $nivel;
                    $etapa;
                    $consulta="SELECT * FROM usuarios WHERE nombre=:usuario";
                    $preparedStatements=$conexion->prepare($consulta);
                    $preparedStatements->execute(array(":usuario"=>$usuario));
                    $conexion=null;
                    while($registro=$preparedStatements->fetch(PDO::FETCH_ASSOC))
                    {
                        if(password_verify($contrasenia,$registro['contrasenia']))
                        {
                            $id=$registro["id"];
                            $nivel=$registro["nivel"];
                            $juegosDesbloqueados=$registro["juegos_desbloqueados"];
                            $accesoConcedido=true;
                        }
                    }
                    if($accesoConcedido)
                    {
                        session_start();
                        $_SESSION["id"]=$id;
                        $_SESSION["usuario"]=$_POST["NombreDeUsuario"];
                        $_SESSION["nivel"]=$nivel;
                        $_SESSION["juegosDesbloqueados"]=$juegosDesbloqueados;
                        header("location:../index.php"); //Nos redirige a la Landing Page
                        exit();
                    }
                    else
                    {
                        echo "<p style='color:red;'>Error: Nombre de usuario incorrecto o contraseña incorrecta.</p>";
                    }
                }
            }
        ?>
        <div class="container">
            <div class="card">
                <div class="card-header" style="text-align:center; background-color:rgb(59,198,145);">
                   <h1 class="title">
                        Iniciar sesión
                    </h1>
                </div>
                <div class="card-body" style="background-color:rgb(248,175,155);">
                    <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" class="row">

                        <label for="nombreDeUsuario" class="col-sm-2 col-form-label title">
                            Nombre de usuario
                        </label>
                        <div class="col-sm-10 mb-3">
                            <input type="text" name="NombreDeUsuario" id="nombreDeUsuario" class="form-control" autofocus>
                            <p id="mensajeValidacionNombreDeUsuario"></p>
                        </div>

                        <label for="contrasenia" class="col-sm-2 col-form-label title">
                            Contraseña
                        </label>
                        <div class="col-sm-10 mb-3">
                            <input type="password" name="Contrasenia" id="contrasenia" class="form-control">
                            <p id="mensajeValidacionContrasenia"></p>
                        </div>

                        <div class="col-sm-10 col-form-label";></div>
                        <div class="col-sm-2">
                            <button class="btn btn-success title" type="submit" name="iniciarSesion" value="Iniciar sesión" id="iniciarSesion" style="background-color:rgb(107,164,164);">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
                <div class="card-footer" style="height:7.007vh; background-color:rgb(59,198,145);"></div>
            </div>
        </div>
    </body>
</html>