<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            Gestionar datos de usuarios
        </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <script src="../js/administracionJs/gestionarDatosDeUsuario.js"></script>
        <link rel="stylesheet" type="text/css" href="../style/estiloAdministracion.css"/>
    </head>
    <body>
        <div class="container">
            <a href="./administracion.php">
                atras
            </a>
            <?php
                session_start();
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
                        $nivelDeUsuario=1;
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
                            $juegosDesbloqueados=$_POST["JuegosDesbloqueados"];
                            $actualizar="UPDATE usuarios SET nombre=:nombre, juegos_desbloqueados=:juegos_desbloqueados WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":nombre"=>$nombre,":juegos_desbloqueados"=>$juegosDesbloqueados,":id"=>$id));
                            $conexion=null;
                            header("Location:./gestionarDatosDeUsuarios.php");
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
                            header("Location:./gestionarDatosDeUsuarios.php");
                            exit();
                        }

                        if(isset($_POST["AscenderAAdministrador"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            
                            $nivel=$_POST["Nivel"];
                            $nivel++;
                            $actualizar="UPDATE usuarios SET nivel=:nivel WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":nivel"=>$nivel,":id"=>$id));

                            $juegosDesbloqueados=4;
                            $actualizar="UPDATE usuarios SET juegos_desbloqueados=:juegos_desbloqueados WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":juegos_desbloqueados"=>$juegosDesbloqueados,":id"=>$id));
                            $conexion=null;

                            header("Location:./gestionarDatosDeUsuarios.php");
                            exit();
                        }
            ?>
                        <p class="h1">
                            Usuarios
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
                                        Nivel
                                    </th>

                                    <th scope="col">
                                        Juegos Desbloqueados
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
                                                    <label class="form-label" for="id">
                                                        <?php echo $registro["id"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["id"]?>" id="id" name="Id" readonly hidden>
                                                </th>

                                                <td>
                                                    <input type="text" class="form-control" value="<?php echo $registro["nombre"]?>" id="nombre" name="Nombre" >
                                                </td>
                                                
                                                <td>
                                                    <label class="form-label" for="nivel">
                                                        <?php echo $registro["nivel"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["nivel"]?>" id="nivel" name="Nivel" readonly hidden>
                                                </td>

                                                <td>
                                                    <input type="text" class="form-control" value="<?php echo $registro["juegos_desbloqueados"]?>" id="juegosDesbloqueados" name="JuegosDesbloqueados">
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-danger" id="borrar" name="Borrar">
                                                        Borrar
                                                    </button>
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-success" id="actualizar" name="Actualizar">
                                                        Actualizar
                                                    </button>
                                                </td>

                                                <?php
                                                    if($_SESSION["nivel"]>2)
                                                    {
                                                ?>
                                                        <td>
                                                            <button type="submit" class="btn btn-success" name="AscenderAAdministrador">
                                                                Ascender a administrador
                                                            </button>
                                                        </td>
                                                <?php
                                                    }
                                                ?>
                                            </form>
                                        </tr>
                                <?php
                                    }
                                ?>
                            </tbody>
                        </table>
            <?php
                    }
                }
                else
                {
                    header("Location:../landingPage.php");
                    exit();
                }
            ?>
        </div>
    </body>
</html>