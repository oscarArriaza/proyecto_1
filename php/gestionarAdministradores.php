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
            Gestionar administradores
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="../style/estiloAdministracion.css"/>
        <script src="../js/gestionarAdministradores.js"></script>
        <script src="../js/administracionJs/validacionCrearUsuario.js"></script>
    </head>
    <body>
        <div class="container">
            <a href="./administracion.php">
                atras
            </a>
            <?php
                if(isset($_SESSION["usuario"]))
                {
                    if($_SESSION["nivel"]<3)
                    {
                        header("Location:../landingPage.php");
                        exit();
                    }
                    else
                    {
                        include("./conexion.php");
                        $nivelDeUsuario=2;
                        $seleccionar="SELECT id,nombre,contrasenia,nivel,juegos_desbloqueados FROM `usuarios` WHERE nivel=$nivelDeUsuario;";
                        $preparedStatements=$conexion->prepare($seleccionar);
                        $preparedStatements->execute();
                        $registros=$preparedStatements->fetchAll();
                        $conexion=null;

                        if(isset($_POST["Actualizar"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $nombre=$_POST["Nombre"];
                            $actualizar="UPDATE usuarios SET nombre=:nombre WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":nombre"=>$nombre, ":id"=>$id));
                            $conexion=null;
                            header("Location:./gestionarAdministradores.php");
                            exit();
                        }

                        if(isset($_POST["Borrar"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $borrar="DELETE FROM usuarios WHERE id=:id";
                            $preparedStatements=$conexion->prepare($borrar);
                            $preparedStatements->execute(array(":id"=>$id));
                            $conexion=null;
                            header("Location:./gestionarAdministradores.php");
                            exit();
                        }

                        if(isset($_POST["DegradarAUsuario"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $contrasenia=0;
                            $nivel=1;
                            $juegosDesbloqueados=1;
                            $actualizar="UPDATE usuarios SET contrasenia=:contrasenia, nivel=:nivel, juegos_desbloqueados=:juegos_desbloqueados WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":contrasenia"=>$contrasenia, ":nivel"=>$nivel, ":juegos_desbloqueados"=>$juegosDesbloqueados, ":id"=>$id));
                            $conexion=null;
                            
                            header("Location:./gestionarAdministradores.php");
                            exit();
                        }

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
                            
                            header("Location:./gestionarAdministradores.php");
                            exit();
                        }

                        if(isset($_POST["crearUsuario"]))
                        {
                            include("./conexion.php");
                            $nombreDeUsuario=$_POST["NombreDeUsuario"];
                            $contrasenia=$_POST["ConfirmarContraseniaCrearUsuario"];
                            $contraseniaCifrada=password_hash($contrasenia,PASSWORD_DEFAULT,array("cost"=>12));
                            $nivel=2;
                            $juegosDesbloqueados=4;
                            $consulta="INSERT INTO `usuarios`(`nombre`, `contrasenia`, `nivel`, `juegos_desbloqueados`) VALUES (:nombreDeUsuario,:contrasenia,:nivel,:juegos_desbloqueados)";
                            $preparedStatements=$conexion->prepare($consulta);
                            $preparedStatements->execute(array(":nombreDeUsuario"=>$nombreDeUsuario,":contrasenia"=>$contraseniaCifrada,":nivel"=>$nivel,":juegos_desbloqueados"=>$juegosDesbloqueados));
                            $preparedStatements->closeCursor();
                            $conexion=null;
                            
                            header("Location:./gestionarAdministradores.php");
                            exit();
                        }
            ?>
                        <p class="h1">
                            Administradores
                        </p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Id
                                    </th>

                                    <th scope="col">
                                        Nombre
                                    </th>

                                    <th scope="col">
                                        Contraseña
                                    </th>

                                    <th scope="col">
                                        Nivel
                                    </th>

                                    <th scope="col">
                                        Juegos desbloqueados
                                    </th>

                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($registros as $registro)
                                    {
                                ?>
                                        <tr>
                                            <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
                                                <th scope="row">
                                                    <label for="id<?php echo $registro["id"]?>">
                                                        <?php echo $registro["id"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["id"]?>" id="id<?php echo $registro["id"]?>" name="Id" readonly hidden>
                                                </th>

                                                <td>
                                                    <label for="nombre<?php echo $registro["id"]?>" hidden>
                                                        <?php echo $registro["nombre"]?>
                                                    </label>
                                                    <input type="text" class="form-control" value="<?php echo $registro["nombre"]?>" id="nombre<?php echo $registro["id"]?>" name="Nombre">
                                                </td>
                                                
                                                <td>
                                                    <label for="contrasenia<?php echo $registro["id"]?>">
                                                        <?php echo $registro["contrasenia"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["contrasenia"]?>" id="contrasenia<?php echo $registro["id"]?>" name="Contrasenia" readonly hidden>
                                                </td>

                                                <td>
                                                    <label for="nivel<?php echo $registro["id"]?>">
                                                        <?php echo $registro["nivel"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["nivel"]?>" id="nivel<?php echo $registro["id"]?>" name="Nivel" readonly hidden>
                                                </td>

                                                <td>
                                                    <label for="juegosDesbloqueados<?php echo $registro["id"]?>">
                                                        <?php echo $registro["juegos_desbloqueados"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["juegos_desbloqueados"]?>" id="juegosDesbloqueados<?php echo $registro["id"]?>" name="JuegosDesbloqueados" readonly hidden>
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-danger" value="Borrar" name="Borrar">
                                                        Borrar
                                                    </button>
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-success" value="Actualizar" name="Actualizar">
                                                        Actualizar
                                                    </button>
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-secondary" name="DegradarAUsuario">
                                                        Degradar a usuario
                                                    </button>
                                                </td>

                                                <td>
                                                    <button type="button" class="btn btn-success" name="cambiarContrasenia" id="cambiarContrasenia<?php echo $registro["id"]?>" data-idUsuario=<?php echo $registro["id"]?>>
                                                        Cambiar contraseña
                                                    </button>
                                                </td>
                                            </form>
                                        </tr>
                                <?php
                                    }
                                ?>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-primary" id="aniadirAdministrador">
                            Añadir administrador
                        </button>
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
                    <label for="id" readonly hidden>
                        Id
                    </label>
                    <input type="text" name="Id" id="id" readonly hidden>
                    <label for="contrasenia">
                        Contraseña
                    </label>
                    <input type="password" class="form-control" name="Contrasenia" id="contrasenia">
                    <p id="mensajeValidacionContrasenia"></p>

                    <label for="confirmarContrasenia">
                        Confirmar contraseña
                    </label>
                    <input type="password" class="form-control" name="ConfirmarContrasenia" id="confirmarContrasenia">
                    <p id="mensajeValidacionConfirmarContrasenia"></p>

                    <button type="submit" class="btn btn-success" name="Cambiar" value="Cambiar" id="cambiar">
                        Cambiar
                    </button>
                </form>
            </dialog>
            <dialog id="dialogo4">
                <p class="h1">
                    Crear usuario
                </p>
                <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
                    <label for="nombreDeUsuario">
                        Nombre de usuario
                    </label>
                    <input type="text" class="form-control" name="NombreDeUsuario" id="nombreDeUsuario" autofocus>
                    <p id="mensajeValidacionNombreDeUsuario"></p>

                    <label for="contraseniaCrearUsuario">
                        Contraseña
                    </label>
                    <input type="password" class="form-control" name="ContraseniaCrearUsuario" id="contraseniaCrearUsuario">
                    <p id="mensajeValidacionContraseniaCrearUsuario"></p>

                    <label for="confirmarContraseniaCrearUsuario">
                        Confirmar contraseña
                    </label>
                    <input type="password" class="form-control" name="ConfirmarContraseniaCrearUsuario" id="confirmarContraseniaCrearUsuario">
                    <p id="mensajeValidacionConfirmarContraseniaCrearUsuario"></p>
                    
                    <button type="button" class="btn btn-success" name="crearUsuario" id="crearUsuario">
                        Crear usuario
                    </button>
                </form>
            </dialog>
        </div>
    </body>
</html>