<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>
            Insertar puntuacion
        </title>
    </head>
    <body>
        <?php
            include("./conexion.php");
            session_start();
            $juego=$_POST["Juego"];
            $usuario=$_POST["Id"];
            $puntuacion=$_POST["Puntuacion"];
            $puntuacionAnterior;
            $seleccionar="SELECT * FROM `puntuaciones` WHERE juego=$juego && usuario=$usuario;";
            $preparedStatements=$conexion->prepare($seleccionar);
            $preparedStatements->execute();
            $registros=$preparedStatements->fetchAll();
            $conexion=null;
            $numeroDeRegistros=count($registros);
            //echo "Id: ".$registros[0]["id"];
            //echo $numeroDeRegistros;
            /*echo '<pre>';
            print_r($registros);
            echo '<pre>';*/
            if($numeroDeRegistros===0)
            {
                include("./conexion.php");
                $insertar="INSERT INTO puntuaciones (juego,usuario,puntuacion) VALUES (:juego,:usuario,:puntuacion)";
                $preparedStatements=$conexion->prepare($insertar);
                $preparedStatements->execute(array(":juego"=>$juego,":usuario"=>$usuario,":puntuacion"=>$puntuacion));
                $conexion=null;

                $juegosDesbloqueados=$juego+1;
                if($juegosDesbloqueados<5)
                {
                    include("./conexion.php");
                    if($_SESSION["nivel"]>1)
                    {
                        $juegosDesbloqueados=4;
                    }
                    $actualizar="UPDATE usuarios SET juegos_desbloqueados=:juegos_desbloqueados WHERE id=:id;";
                    $preparedStatements=$conexion->prepare($actualizar);
                    $preparedStatements->execute(array(":juegos_desbloqueados"=>$juegosDesbloqueados,":id"=>$usuario));
                    $conexion=null;
                }
                
                header("Location:../index.php");
                exit();
            }
            else
            {
                $puntuacionAnterior=$registros[0]["puntuacion"];
                if($puntuacionAnterior<$puntuacion)
                {
                    include("./conexion.php");
                    $id=$registros[0]["id"];
                    $puntuacion=$_POST["Puntuacion"];
                    $actualizar="UPDATE puntuaciones SET puntuacion=:puntuacion WHERE id=:id;";
                    $preparedStatements=$conexion->prepare($actualizar);
                    $preparedStatements->execute(array(":puntuacion"=>$puntuacion,":id"=>$id));
                    $conexion=null;
                }
                header("Location:../index.php");
                exit();
            }
        ?> 
    </body>
</html>