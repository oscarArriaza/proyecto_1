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
        <script src="../js/administracionJs/gestionarPuntuaciones.js"></script>
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
                        $seleccionar="SELECT puntuaciones.id,juegos.nombre AS juego ,usuarios.nombre AS usuario,puntuaciones.puntuacion FROM usuarios JOIN puntuaciones ON usuarios.id=puntuaciones.usuario JOIN juegos ON juegos.id=puntuaciones.juego ORDER BY id;";
                        $preparedStatements=$conexion->prepare($seleccionar);
                        $preparedStatements->execute();
                        $registros=$preparedStatements->fetchAll();
                        $conexion=null;

                        if(isset($_POST["Actualizar"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $puntuacion=$_POST["Puntuacion"];
                            $actualizar="UPDATE puntuaciones SET puntuacion=:puntuacion WHERE id=:id";
                            $preparedStatements=$conexion->prepare($actualizar);
                            $preparedStatements->execute(array(":puntuacion"=>$puntuacion, ":id"=>$id));
                            $conexion=null;
                            header("Location:./gestionarPuntuaciones.php");
                            exit();
                        }

                        if(isset($_POST["Borrar"]))
                        {
                            include("./conexion.php");
                            $id=$_POST["Id"];
                            $borrar="DELETE FROM puntuaciones WHERE id=:id";
                            $preparedStatements=$conexion->prepare($borrar);
                            $preparedStatements->execute(array(":id"=>$id));
                            $conexion=null;
                            header("Location:./gestionarPuntuaciones.php");
                            exit();
                        }
            ?>
                        <p class="h1">
                            Puntuaciones
                        </p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Id
                                    </th>

                                    <th scope="col">
                                        Juego
                                    </th>

                                    <th scope="col">
                                        Usuario
                                    </th>

                                    <th scope="col">
                                        Puntuacion
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
                                                    <label <?php echo $registro["id"]?>>
                                                        <?php echo $registro["id"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["id"]?>" id="id" name="Id" readonly hidden>
                                                </th>

                                                <td>
                                                    <label>
                                                        <?php echo $registro["juego"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["juego"]?>" id="juego" name="Juego" readonly hidden>
                                                </td>
                                                
                                                <td>
                                                    <label>
                                                        <?php echo $registro["usuario"]?>
                                                    </label>
                                                    <input type="text" value="<?php echo $registro["usuario"]?>" id="usuario" name="Usuario" readonly hidden>
                                                </td>

                                                <td>
                                                    <input type="text" class="form-control" value="<?php echo $registro["puntuacion"]?>" id="puntuacion" name="Puntuacion">
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-danger" value="Borrar" id="borrar" name="Borrar">
                                                        Borrar
                                                    </button>
                                                </td>

                                                <td>
                                                    <button type="submit" class="btn btn-success" value="Actualizar" id="actualizar" name="Actualizar">
                                                        Actualizar
                                                    </button>
                                                </td>
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