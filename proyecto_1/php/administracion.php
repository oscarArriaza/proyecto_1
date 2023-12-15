<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            Administración
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="../style/estiloAdministracion.css"/>
        <script src="../js/administracionJs/administracion.js"></script>
    </head>
    <body>
        <div class="container">
            <a href="../index.php">
                atras
            </a>
            <?php
                $id=$_SESSION["id"];
                if(isset($_SESSION["usuario"]))
                {
                    if($_SESSION["nivel"]<2)
                    {
                        header("Location:../landingPage.php");
                        exit();
                    }
                    else
                    {
                        include("./conexion.php");
                        $id=$_SESSION["id"];
                        $seleccionar="SELECT nombre FROM `usuarios` WHERE id=$id;";
                        $preparedStatements=$conexion->prepare($seleccionar);
                        $preparedStatements->execute();
                        $registros=$preparedStatements->fetchAll();
                        $conexion=null;
                        $nuevoNombre=$registros[0]["nombre"];
                        $_SESSION["usuario"]=$nuevoNombre;
                        if(isset($_POST["Cambiar"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $contrasenia=$_POST["ConfirmarContrasenia"];
                            $contraseniaCifrada=password_hash($contrasenia,PASSWORD_DEFAULT,array("cost"=>12));
                            $actualizar="UPDATE usuarios SET contrasenia=:contrasenia WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":contrasenia"=>$contraseniaCifrada,":id"=>$id));
                            $conexion=null;
                            
                            header("Location:./administracion.php");
                            exit();
                        }

                        if(isset($_POST["Cambiar2"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $nuevoNombre=$_POST["NombreDeUsuario"];
                            $actualizar="UPDATE usuarios SET nombre=:nombre WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":nombre"=>$nuevoNombre,":id"=>$id));
                            $conexion=null;
                            
                            header("Location:./administracion.php");
                            exit();
                        }
            ?>
                        <p class="h1">
                            Administración
                        </p>
                        <p>
                            Usuario: <?php echo $_SESSION["usuario"]?>
                        </p>
                        <div class="contenedorOpcion">
                            <a href="./gestionarDatosDeUsuarios.php">
                                <button type="button" class="btn btn-secondary">
                                    Gestionar datos de usuarios
                                </button>
                            </a>
                        </div>
                        <br>
                        <div class="contenedorOpcion">
                            <a href="./gestionarPuntuaciones.php">
                                <button type="button" class="btn btn-secondary">
                                    Gestionar puntuaciones
                                </button>
                            </a>
                        </div>
                        <br>
                        <div class="contenedorOpcion">
                            <?php
                                if($_SESSION["nivel"]===3)
                                {
                            ?>
                                    <a href="./gestionarAdministradores.php">
                                        <button type="button" class="btn btn-secondary">
                                            Gestionar administradores
                                        </button>
                                    </a>                        
                                    <br>
                                    <br>
                            <?php
                                }
                            ?>
                        </div>
                        <div class="contenedorOpcion">
                            <button type="button" class="btn btn-success" name="cambiarNombre" id="cambiarNombre<?php echo $id;?>" data-idUsuario=<?php echo $id;?>>
                                Cambiar nombre
                            </button>
                        </div>
                        <br>
                        <div class="contenedorOpcion">
                            <button type="button" class="btn btn-success" name="cambiarContrasenia" id="cambiarContrasenia<?php echo $id;?>" data-idUsuario=<?php echo $id;?>>
                                Cambiar contraseña
                            </button>
                        </div>
                        <br>
                        <div class="contenedorOpcion">
                            <a href='./cerrarSesion.php'>
                                <button type="button" class="btn btn-danger" name='cerrarSesion' id='cerrarSesion'>
                                    Cerrar Sesion
                                </button>
                            </a>
                        </div>
            <?php
                    }
                }
                else
                {
                    header("Location:../landingPage.php");
                    exit();
                }
            ?>
            <dialog id="dialogo2">
                <p class="h1">
                    Cambiar contraseña
                </p>
                <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
                    <label class="form-label" for="id" readonly hidden>
                        Id
                    </label>
                    <input type="text" name="Id" id="id" readonly hidden>
                    <label class="form-label" for="contrasenia">
                        Contraseña
                    </label>
                    <input type="password" class="form-control" name="Contrasenia" id="contrasenia">
                    <p id="mensajeValidacionContrasenia"></p>

                    <label class="form-label" for="confirmarContrasenia">
                        Confirmar contraseña
                    </label>
                    <input type="password" class="form-control" name="ConfirmarContrasenia" id="confirmarContrasenia">
                    <p id="mensajeValidacionConfirmarContrasenia"></p>

                    <button type="submit" class="btn btn-success" name="Cambiar" id="cambiar">
                        Cambiar
                    </button>
                </form>
            </dialog>
            <dialog id="dialogo3">
                <p class="h1">
                    Cambiar nombre
                </p>
                <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
                    <label class="form-label" for="id2" readonly hidden>
                        Id
                    </label>
                    <input type="text" name="Id" id="id2" readonly hidden>
                    <label class="form-label" for="nombreDeUsuario">
                    Nombre de usuario
                    </label>
                    <input type="text" class="form-control" name="NombreDeUsuario" id="nombreDeUsuario" autofocus>
                    <p id="mensajeValidacionNombreDeUsuario"></p>
                    <button type="submit" class="btn btn-success" name="Cambiar2" value="Cambiar" id="cambiar2">
                        Cambiar
                    </button>
                </form>
            </dialog>
        </div>
    </body>
</html>