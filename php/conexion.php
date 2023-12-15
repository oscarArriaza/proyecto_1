<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conexion</title>
    </head>
    <body>
        <?php
            try
            {
                $conexion=new PDO("mysql:host=localhost; port=3306; dbname=administracion","root","mysql");
                $conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                $conexion->exec("SET CHARACTER SET UTF8");
            }
            catch(Exception $e)
            {
                echo "<br>";
                echo "<br>";
                echo "Mensaje del error: ".$e->getMessage();
                echo "<br>";
                echo "<br>";
                echo "Codigo del error: ".$e->getCode();
                echo "<br>";
                echo "<br>";
                echo "Nombre del fichero donde ocurrio el error: ".$e->getFile();
                echo "<br>";
                echo "<br>";
                echo "Linea del error: ".$e->getLine();
                echo "<br>";
                echo "<br>";
                die("Proceso terminado.");
            }
            /*finally
            {
                $conexion=null;
            }*/
        ?>
    </body>
</html>