<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php
        if(!isset($_SESSION["usuario"]))
        {
    ?>
            <script src="./js/administracionJs/funcionalidad.js"></script>
    <?php
        }
    ?>
    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/4cb17968f0.js" crossorigin="anonymous"></script>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <!-- Style CSS -->
    <link rel="stylesheet" href="./style/style.css">
    <title>.:: Laia | Home</title>
</head>
<body>
  <?php
    if(isset($_SESSION["usuario"]))
    {
      include("./php/conexion.php");
      $id=$_SESSION["id"];
      $seleccionar="SELECT juegos_desbloqueados FROM `usuarios` WHERE id=$id;";
      $preparedStatements=$conexion->prepare($seleccionar);
      $preparedStatements->execute();
      $registros=$preparedStatements->fetchAll();
      $conexion=null;
      $nuevoJuegoDesbloqueado=$registros[0]["juegos_desbloqueados"];
      $_SESSION["juegosDesbloqueados"]=$nuevoJuegoDesbloqueado;
      //echo "<script>console.log(".$_SESSION['juegosDesbloqueados'].");</script>";
      echo "<input type='text' value='".$_SESSION['juegosDesbloqueados']."' id='juegosDesbloqueados' readonly hidden>";
    }
    if(isset($_POST["Enviar"]))
    {
      include("./php/conexion.php");
      $nombreDeUsuario=$_POST["NombreDeUsuario"];
      $contrasenia=$_POST["ConfirmarContrasenia"];
      $nivel=1;
      $juegos_desbloqueados=1;
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
        include("./php/conexion.php");
        $usuario=htmlentities(addslashes($nombreDeUsuario));
        $contrasenia=htmlentities(addslashes($contrasenia));
        $consulta="SELECT * FROM usuarios WHERE nombre=:usuario";
        $preparedStatements=$conexion->prepare($consulta);
        $preparedStatements->execute(array(":usuario"=>$usuario));
        $conexion=null;
        while($registro=$preparedStatements->fetch(PDO::FETCH_ASSOC))
        {
            if($contrasenia===$registro['contrasenia'])
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
            $_SESSION["usuario"]=$nombreDeUsuario;
            $_SESSION["nivel"]=$nivel;
            $_SESSION["juegosDesbloqueados"]=$juegosDesbloqueados;
        }
        header("location:./index.php");
      }
      else
      {
        include("./php/conexion.php");
        $consulta="INSERT INTO `usuarios`(`nombre`, `contrasenia`, `nivel`, `juegos_desbloqueados`) VALUES (:nombreDeUsuario,:contrasenia,:nivel,:juegos_desbloqueados)";
        $preparedStatements=$conexion->prepare($consulta);
        $preparedStatements->execute(array(":nombreDeUsuario"=>$nombreDeUsuario,":contrasenia"=>$contrasenia,":nivel"=>$nivel,":juegos_desbloqueados"=>$juegos_desbloqueados));
        $preparedStatements->closeCursor();
        $conexion=null;
        echo "<p style='color:green;'>La cuenta fue creada exitosamente</p>";
        $accesoConcedido=false;
        if(isset($_POST["Enviar"]))
        {
          include("./php/conexion.php");
          $usuario=htmlentities(addslashes($nombreDeUsuario));
          $contrasenia=htmlentities(addslashes($contrasenia));
          $consulta="SELECT * FROM usuarios WHERE nombre=:usuario";
          $preparedStatements=$conexion->prepare($consulta);
          $preparedStatements->execute(array(":usuario"=>$usuario));
          $conexion=null;
          while($registro=$preparedStatements->fetch(PDO::FETCH_ASSOC))
          {
              if($contrasenia===$registro['contrasenia'])
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
              $_SESSION["usuario"]=$nombreDeUsuario;
              $_SESSION["nivel"]=$nivel;
              $_SESSION["juegosDesbloqueados"]=$juegosDesbloqueados;
          }
        }
        header("location:./index.php");
      }
    }
  ?>
    <div class="wrapper">
      <header class="main">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid d-flex">
            <!-- logo -->
            <a href="#" class="navbar-brand">
              <h1 class="logoApp">LAIA</h1>
            </a>
            <!-- button toggle -->
            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
              <!-- navbar admin -->
            <div class="collapse navbar-collapse " id="navbarNav">
              <!-- menu -->
              <ul class="navbar-nav  mb-2 mb-lg-0"> <!-- mx-auto -->
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#home" data-translate="inicio">Home</a>
                </li>
                <li class="nav-item">
                  <a href="#roadmap" class="nav-link" data-translate="roadmap">Roadmap</a>
                </li>
                <li class="nav-item">
                  <a href="#about" class="nav-link" data-translate="about">About</a>
                </li>
                <li class="nav-item">
                  <a href="#ranking" class="nav-link" data-translate="ranking">Ranking</a>
                </li>
                <li class="nav-item dropdown">
                  <a href="#" class="nav-link dropdown-toogle" id="navbarIdioma" role="button" data-bs-toggle="dropdown" aria-expanded="false">ENG</a>
                  <ul class="dropdown-menu menuIdioma" aria-labelledby="navbarIdioma">
                    <li><a class="dropdown-item" id="ca">Català </a></li>
                    <li><a class="dropdown-item" id="en">English</a></li>
                    <li><a class="dropdown-item" id="es">Español</a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a href="#" class="nav-link dropdown-toogle" id="navbarAdmin" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarAdmin">
                    <?php
                      if(isset($_SESSION["usuario"]))
                      {
                        if($_SESSION["nivel"]>=2)
                        {
                    ?>
                          <a class="dropdown-item" href='./php/administracion.php'>
                            <p name='administracion' id='administracion'>
                              Administración
                            </p>
                          </a>
                    <?php
                        }
                    ?>
                        <a class="dropdown-item" href='./php/cerrarSesion.php'>
                          <p name='cerrarSesion' id='cerrarSesion'>
                            Cerrar sesion
                          </p>
                        </a>
                    <?php
                      }
                      else
                      {
                    ?>
                        <a class="dropdown-item" href='./php/iniciarSesion.php'>
                            <p name='iniciarSesion' id='iniciarSesion'>
                              Iniciar sesion
                            </p>
                        </a>
                    <?php
                      }
                    ?>
                  </ul>
                </li>
                
              </ul>
              
            </div>

            <!-- navbar languajes tralator -->
            
          </div>
        </nav>
      </header>
        
        <section class="home" id="home">
          <div class="textHeader">
            <h2 id="textIndu">रो श न</h2>
            <h1 id="textMain"> LAIA </h1>
            <!-- ens il·lumines -->
            <div class="textSub">
            <h3 id="textSub">you enlighten us</h3><span>?</span>
            </div>
          </div>
          
          <div class="btn-box">
            <a class="btn btn-animate" href="#roadmap" data-translate="jugar-ahora">PLAY NOW</a>
          </div>
          
          <div class="divider-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
            </svg>
          </div>

        </section>

        <!-- ROADMAP SECTION -->

        <section class="roadmap" id="roadmap">

          <h2 class="title" id="titleRoadmap" data-translate="start-campaing">Start a campaing</h2>
          <div class="stages-container">
            <div class="row">
              <!-- Barcelona -->
              <div class="col-md-3 col-sm-6 col-12 card-stage <?php if(!isset($_SESSION['usuario'])){echo 'jugar';}?>">
                <!-- poster -->
                <!-- description -->
                <div class="stage-description">
                  <h2 class="stage-location">Barcelona</h2>
                </div>
              </div>
              <!-- Brasil -->
              <div class="col-md-3 col-sm-6 col-12 card-stage <?php if(!isset($_SESSION['usuario'])){echo 'jugar';}?>">
                <div class="stage-description">
                  <h2 class="stage-location">Brasil</h2>
                </div>
              </div>
              <!-- Kenia -->
              <div class="col-md-3 col-sm-6 col-12 card-stage <?php if(!isset($_SESSION['usuario'])){echo 'jugar';}?>">
                <div class="stage-description">
                  <h2 class="stage-location">Kenia</h2>
                </div>
              </div>
              <!-- India -->
              <div class="col-md-3 col-sm-6 col-12 card-stage <?php if(!isset($_SESSION['usuario'])){echo 'jugar';}?>">
                <div class="stage-description">
                  <h2 class="stage-location">India</h2>
                </div>
              </div>
              
            </div>
            
          </div>

        </section>

        <!-- ABOUT SECTION -->

        <section class="about" id="about">
          <div class="container container-about">

            <div class="row">
              <div class="col-4 d-flex flex-column justify-content-center"> 
                <h3 data-translate="who-is">Who is</h3>
                <h2 class="title">LAIA ?</h2>
              </div>
              <div class="col-8 about-text">
                <p>
                  <strong>Laia</strong> una aventurera Catalana, tiene una <strong>misión muy importante:</strong> ayudar a sus amigos a electrificar con <strong>energías renovables </strong> distintos pueblos del mundo. Para lograrlo, Laia se ha propuesto recorrer <strong>Brasil, Kenia e India.</strong>
                  ¿Te animas a ayudarla a iluminar el mundo? ¡Juega con ella y descubre cómo puedes contribuir a esta noble causa!
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="about-img">
                  <img src="./media/LaiasBITMOJI/laia-web.png" alt="image About Laia">
                </div>
                <!-- <div class="btn-box">
                  <a class="btn">roadmap</a>
                </div> -->
              </div>
              <!-- Flags -->
              <div class="col-8">
                <div class="row mx-5 py-3">
                  <div class="col-3 flag border-0">
                    <div class="flag-spain"></div>
                  </div>
                  <div class="col-6 flag">
                    <div class="flag-brasil">
                      <div class="circle"></div>
                    </div>
                    <div class="flag-india"></div>
                  </div>
                  <div class="col-3 flag">
                    <div class="flag-kenia"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- START CHARACTERS SECTION -->

        <section class="characters" id="characters">
          <h2 class="title" data-translate="characters">Characters</h2>
          <div class="characters-container">
            <div class="row g-5">
              <div class="col-12 col-md-4">
                <div class="w-100 character"> <!-- card -->
                  <div class="img-character"><img src="./media/personajes/cauan4.jpeg" alt=""></div> <!-- poster -->
                  <div class="details">
                    <h1>Cauan Mirin</h1>
                    <h2>Brasil</h2>
                    <p class="desc">
                      La misión en este juego es crear una red de energía, que permita dotar de electricidad una escuela del Poblado de Tatuyo, para lograrlo Laia debera de obtener los objetos necesarios que son bombillas, cables con enchufes y placas solares.
                    </p>
                  </div>
                </div>
              </div>
  
              <div class="col-12 col-md-4">
                <div class="w-100 character">
                  <div class="img-character"><img src="./media/personajes/malik3.jpeg" alt=""></div> <!-- poster -->
                  <div class="details">
                    <h1>Malik Pokot</h1>
                    <h2>Kenia</h2>
                    <p class="desc">
                      Juego matemático, que permita a Laia conocer la velocidad del viento que se origina en el pueblo de Kenia. Para lograrlo deberás realizar cálculos matemáticos que ayuden a resolverlo y que estos datos puedan ser útiles para aprovecharlos en estaciones de energía eólica.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="w-100 character">
                  <div class="img-character"><img src="./media/personajes/alisha3.jpeg" alt=""></div> <!-- poster -->
                  <div class="details">
                    <h1>Alisha Singh</h1>
                    <h2>India</h2>
                    <p class="desc">
                      Por último, presentamos un juego entretenido de tipo puzle, ¡un Memory clásico! Que deberás completar tres niveles para poder superarlo. La dificultad irá creciendo a medida que completes un nivel. Supera las pruebas y siéntete orgullo de posicionarte en el top de nuestro ranking. ¡Vamos por ello!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- END CHARACTERS SECTION -->

        <!-- START RANKING SECTION -->
        <section class="ranking" id="ranking">
          <?php
              include("./php/conexion.php");
              $seleccionar="SELECT usuarios.nombre, SUM(puntuaciones.puntuacion)AS total FROM usuarios JOIN puntuaciones ON usuarios.id=puntuaciones.usuario GROUP BY usuario ORDER BY total DESC LIMIT 10;";
              $preparedStatements=$conexion->prepare($seleccionar);
              $preparedStatements->execute();
              $registros=$preparedStatements->fetchAll();
              $conexion=null;
          ?>
          <div class="ranking-container">
            <div class="row">
              <div class="col col-md-6">
                <!-- titulos encabezados de seccion -->
                <div class="head-ranking">
                  <h3 data-translate="latest-winners">latest winners</h3>
                  <h2 class="title" data-translate="leaderboard">LeaderBoard</h2>
                </div>
              </div>
              <div class="col col-md-6">
                <!-- tabla de ranking -->
                <div class="leaderboard">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                        <?php
                            $contador=1;
                            foreach ($registros as $registro)
                            {
                        ?>
                              <tr>
                                  <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
                                      <th scope="row"><?php echo $contador?></th>
                                      <th>
                                        <?php echo $registro["nombre"]?>
                                      </th>

                                      <th>
                                        <?php echo $registro["total"]?>
                                      </th>

                                  </form>
                              </tr>
                        <?php
                              $contador++;
                            }
                        ?>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- END RANKING SECTION -->
        
        <!-- START TEAM SECTION -->
        <section class="team" id="team">
          <div class="container-fluid">
            <h2 class="title" data-translate="dev-team">Developer Team</h2>
            <div class="equipo row">
              <div class="col-md-6 col-lg-3">
                <div class="info-team">
                  <img src="./media/developers/marcelo.png" alt="Team member image">
                  <h3>Marcelo</h3>
                  <p>Product Manager</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="info-team">
                  <img src="./media/developers/joel.png" alt="Team member image">
                  <h3>Joel</h3>
                  <p>Dev.</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="info-team">
                  <img src="./media/developers/oscar.png" alt="Team member image">
                  <h3>Oscar</h3>
                  <p>Admin. BD</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="info-team">
                  <img src="./media/developers/josue.png" alt="Team member image">
                  <h3>Josue</h3>
                  <p>Fronted Dev.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- END TEAM SECTION -->

        <!-- FOOTER START -->
        <footer class="footer">
          <div class="footer-container">
            <div class="container-fluid">
              <!-- logo -->
              <div class="logo-footer">
                <a href="#"><h1 class="logoApp">LAIA</h1></a>
              </div>
              <div class="redes-sociales">
                <i class="fa-brands fa-github"></i>
                <i class="fa-brands fa-linkedin"></i>
                <i class="fa-brands fa-instagram"></i>
              </div>
            </div>

            <div class="menu-footer">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a href="#home" class="nav-link" aria-current="page" data-translate="inicio">Home</a>
                </li>
                <li class="nav-item">
                  <a href="#roadmap" class="nav-link" data-translate="roadmap">Roadmap</a>
                </li>
                <li class="nav-item">
                  <a href="#about" class="nav-link" data-translate="about">About</a>
                </li>
                <li class="nav-item">
                  <a href="#ranking" class="nav-link" data-translate="ranking">Ranking</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="copyright">
            <h5>2023 | Made with ❤️ | DAW - 2B | Team 7 </h5>
          </div>

        </footer>
        <!-- FOOTER END -->

        <!-- Modal LOGIN -->
        <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="welcomeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <!-- <h5 class="modal-title" id="welcomeModalLabel">LOGIN</h5> -->
                      <h3 class="modal-title" id="welcomeModalLabel">Bienvenido</h3>
                  </div>
                  <div class="modal-body">
                      
                      <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
                        <div class="mb-5">
                          <h1>LOGIN</h1>
                        </div>
                        <div class="mb-4">
                          <input type="text" class="form-control" id="nombreDeUsuario" name="NombreDeUsuario" placeholder=" Username o Email" required>
                        </div>
                        <label for="contrasenia" hidden>
                          Contraseña
                        </label>
                        <input type="password" name="Contrasenia" id="contrasenia" value=0 readonly hidden>
                        <label for="confirmarContrasenia" hidden>
                            Confirmar contraseña
                        </label>
                        <input type="password" name="ConfirmarContrasenia" id="confirmarContrasenia" value=0 readonly hidden>
                        <div class="mb-4">
                          <button type="submit" class="btn btn-login" name="Enviar" id="enviar">Iniciar sesión</button>
                        </div>
                      </form>
                  </div>
                  <div class="modal-footer">
                      
                  </div>
              </div>
          </div>
      </div>

        <!-- Button Back to Top -->
        <button type="button" class="btn" id="back-to-top">
          <i class="fa-solid fa-arrow-up"></i>
        </button>
        
    <!-- Script JS -->
    <?php
        if(!isset($_SESSION["usuario"]))
        {
    ?>
            <script src="./js/indexJs/index0.js"></script>
    <?php
        }
        else
        {
    ?>
            <script src="./js/index.js"></script>
    <?php
        }
    ?>
</body>
</html>