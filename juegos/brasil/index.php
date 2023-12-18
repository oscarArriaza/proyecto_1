
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/4cb17968f0.js" crossorigin="anonymous"></script>
    <!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Style CSS -->
    <link rel="stylesheet" href="./style/style.css">
    <title>.:: Laia en Brasil</title>
</head>
<body>
<?php
         session_start();
        if(isset($_SESSION["usuario"]))
       {
        include("../../php/conexion.php");
        $id=$_SESSION["id"];
        $seleccionar="SELECT juegos_desbloqueados FROM `usuarios` WHERE id=$id;";
        $preparedStatements=$conexion->prepare($seleccionar);
        $preparedStatements->execute();
        $registros=$preparedStatements->fetchAll();
        $conexion=null;
        $nuevoJuegoDesbloqueado=$registros[0]["juegos_desbloqueados"];
        $_SESSION["juegosDesbloqueados"]=$nuevoJuegoDesbloqueado;
        if($_SESSION["juegosDesbloqueados"]>=2)
        {
    ?>
            <!-- Contenedor del juego -->

    <div class="d-flex align-items-center vh-100">
        <div class="container">
            <div class="card card-map">
                <div class="card-header header-panel">
                    <div class="location">
                        <img src="./media/icoPanel/localizacion.png" alt="ico localizacion">
                        <p>Tatuyo, Brasil</p>
                    </div>
                    <div class="user-info">
                        <!-- nombre de usuario (GET) -->
                        <img src="./media/icoPanel/usuario.png" alt="ico usuario">
                        <p><?php echo $_SESSION['usuario']; ?></p>
                    </div>
                    <!-- Panel que mostrara el estado de las pruebas a completar -->
                    <div class="status">
                        <ul>
                            <li><img src="./media/icoPanel/idea.png" alt="" class="img-fluid"><span id="bombillasObtenidas">0</span></li>
                            <li><img src="./media/icoPanel/cable-de-extension.png" alt=""><span id="cablesObtenidos">0</span></li>
                            <li><img src="./media/icoPanel/panel-solar.png" alt=""><span id="panelesObtenidos">0</span></li>
                        </ul>
                    </div>
                    <div class="puntajeTotal">
                        <!-- Mostrar Puntaje Total -->
                        <i id="totalPuntos">Puntaje Total</i>
                    </div>
                </div>
                <div class="card-body">
                    <div id="mapa"></div>
                </div>
    
                <!-- Modal Bienvenida -->
    
                <div class="modal fade modal-lg" id="welcomeModal" tabindex="-1" role="dialog" aria-labelledby="welcomeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="welcomeModalLabel">Bienvenido a Brasil</h5>
                            </div>
                            <div class="modal-body">
                                <h1>Eu falo Portugués</h1>
                                <p>
                                    <b>Laia</b> debe colaborar a <em>Cauan</em>, creando una red eléctrica para una escuela en Tatuyo (Brasil). 
                                    Para esta misión deberemos aprender algunas palabras y su traducción en Portugués, el idioma oficial de Brasil.
                                </p>
                                <h3>Instrucciones</h3>
                                <p class="mb-3">Para cada misión, 
                                    <button class="btn btn-icon" data-bs-toggle="popover" title="Obtener Bombillas" data-bs-content="Al completar la misión, obtendremos las bombillas suficientes para iluminar la escuela."><img src="./media/icoPanel/idea.png" alt=""></button> 
                                    <button class="btn btn-icon" data-bs-toggle="popover" title="Obtener Cables y enchufes" data-bs-content="Al completar la misión, obtendremos cables y enchufes para la red eléctrica."><img src="./media/icoPanel/cable-de-extension.png" alt=""></button> 
                                    <button class="btn btn-icon" data-bs-toggle="popover" title="Obtener Placas solares" data-bs-content="Al completar la misión, obtendremos placas solares y completar la red eléctrica."><img src="./media/icoPanel/panel-solar.png" alt=""></button> 
                                tendremos que acertar la traducción de 5 palabras en Portugués.</p>
                                <p>
                                    Debes completar las 3 misiones y lograr iluminar la escuela.
                                    Para salir del juego, deberemos llegar al punto de salida.
                                    <button class="btn btn-icon" data-bs-toggle="popover" title="Salir del Juego" data-bs-content="Completa las tres misiones, para culminar la iluminacion y salir del juego."><img src="./media/icoPanel/door.png" alt=""></button> 
                                </p>
                                <small class="mb-3">(*) Clic en cada icono para Ver más.</small>
                                <h3>Movimientos</h3>
                                <p>
                                    Estan permitidas las teclas...
                                    <button class="btn btn-icon"><i class="fa-solid fa-arrow-left"></i></button>
                                    <button class="btn btn-icon"><i class="fa-solid fa-arrow-up"></i></button>
                                    <button class="btn btn-icon"><i class="fa-solid fa-arrow-right"></i></button>
                                    <button class="btn btn-icon"><i class="fa-solid fa-arrow-down"></i></button>
                                </p>
                                <p>Buena suerte...!!!</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ADELANTE</button>
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- Modal Juego 1 -->
                <div class="modal fade modal-xl" id="modal1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="miModal1Label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Conociendo el idioma</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- ----- -->
                                <div class="card card-modal">
                                    <div class="card-header header-modal">
                                        <div class="row panelGame">
                                            
                                            <div class="itemHeadCard">
                                                <!-- tiempo permitido por pregunta -->
                                                <img src="./media/icoPanel/despertador.png" alt="iconTime">
                                                <!-- muestro el tiempo que tenemos paraa elegir la opcion correcta -->
                                                <i id="modal1-temporizador">20</i>
                                            </div>
                                            
                                            <div class="itemHeadCard">
                                                <!-- objetos obtenidos -->
                                                <div class="objeto" id="obj-1"><img src="./media/icoPanel/bombeta.svg" alt=""></div>
                                                <div class="objeto" id="obj-2"><p id="modal1-puntos">0</p></div>
                                                <div class="objeto" id="obj-3"><img src="./media/icoPanel/bombeta.svg" alt=""></div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <!-- palabra Elegida -->
                                        <div class="wordChoose">
                                            <!-- inner HTML -->
                                            <div class="inline-block">
                                                <span>¿</span><p>Cómo se dice</p><span>...</span>
                                            </div>
                                            <h2 id="modal1-palabra"></h2>
                                            <div class="inline-block">
                                                <span>...</span><p>en Portugès</p><span>?</span>
                                            </div>
                                        </div>
                                        <div class="row options">
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal1-option1">Option1</button></div>
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal1-option2">Option2</button></div>
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal1-option3">Option3</button></div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <!-- buttons -->
                                    </div>
                                </div>
                                <!-- ----- -->
                            </div>
                            
                            <div class="footer">
                                <span>© 2023 | Made with ❤️ by <a href="https://josueqm.github.io/">@josueqm</a></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Juego 2 -->
                <div class="modal fade modal-xl" id="modal2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="miModal2Label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Conociendo el idioma</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- ----- -->
                                <div class="card card-modal">
                                    <div class="card-header header-modal">
                                        <div class="row panelGame">
                                            
                                            <div class="itemHeadCard">
                                                <!-- tiempo permitido por pregunta -->
                                                <img src="./media/icoPanel/despertador.png" alt="iconTime">
                                                <!-- muestro el tiempo que tenemos paraa elegir la opcion correcta -->
                                                <i id="modal2-temporizador">20</i>
                                            </div>
                                            
                                            <div class="itemHeadCard">
                                                <!-- objetos obtenidos -->
                                                <div class="objeto" id="obj-1"><img src="./media/icoPanel/cable-de-extension.png" alt=""></div>
                                                <div class="objeto" id="obj-2"><p id="modal2-puntos">0</p></div>
                                                <div class="objeto" id="obj-3"><img src="./media/icoPanel/cable-de-extension.png" alt=""></div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <!-- palabra Elegida -->
                                        <div class="wordChoose">
                                            <!-- inner HTML -->
                                            <div class="inline-block">
                                                <span>¿</span><p>Cómo se dice</p><span>...</span>
                                            </div>
                                            <h2 id="modal2-palabra"></h2>
                                            <div class="inline-block">
                                                <span>...</span><p>en Portugès</p><span>?</span>
                                            </div>
                                        </div>
                                        <div class="row options">
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal2-option1">Option1</button></div>
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal2-option2">Option2</button></div>
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal2-option3">Option3</button></div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <!-- buttons -->
                                    </div>
                                </div>
                                <!-- ----- -->
                            </div>
                            
                            <div class="footer">
                                <span>© 2023 | Made with ❤️ by <a href="https://josueqm.github.io/">@josueqm</a></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Juego 3 -->
                <div class="modal fade modal-xl" id="modal3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="miModal3Label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Conociendo el idioma</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- ----- -->
                                <div class="card card-modal">
                                    <div class="card-header header-modal">
                                        <div class="row panelGame">
                                            
                                            <div class="itemHeadCard">
                                                <!-- tiempo permitido por pregunta -->
                                                <img src="./media/icoPanel/despertador.png" alt="iconTime">
                                                <!-- muestro el tiempo que tenemos paraa elegir la opcion correcta -->
                                                <i id="modal3-temporizador">20</i>
                                            </div>
                                            
                                            <div class="itemHeadCard">
                                                <!-- objetos obtenidos -->
                                                <div class="objeto" id="obj-1"><img src="./media/icoPanel/panels.svg" alt=""></div>
                                                <div class="objeto" id="obj-2"><p id="modal3-puntos">0</p></div>
                                                <div class="objeto" id="obj-3"><img src="./media/icoPanel/panels.svg" alt=""></div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <!-- palabra Elegida -->
                                        <div class="wordChoose">
                                            <!-- inner HTML -->
                                            <div class="inline-block">
                                                <span>¿</span><p>Cómo se dice</p><span>...</span>
                                            </div>
                                            <h2 id="modal3-palabra"></h2>
                                            <div class="inline-block">
                                                <span>...</span><p>en Portugès</p><span>?</span>
                                            </div>
                                        </div>
                                        <div class="row options">
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal3-option1">Option1</button></div>
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal3-option2">Option2</button></div>
                                            <div class="col-sm-4"><button class="btn btn-option" id="modal3-option3">Option3</button></div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <!-- buttons -->
                                        </div>
                                    </div>
                                </div>
                                <!-- ----- -->
                            </div>
                            
                            <div class="footer">
                                <span>© 2023 | Made with ❤️ by <a href="https://josueqm.github.io/">@josueqm</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Formulario de envio de puntos -->
    <div hidden>
        <form action="../../php/insertarPuntuacion.php" method="post" id="formularioPuntaje">
            <label for="juego">
                Juego:
            </label>
            <input type="text" id="juego" name="Juego" value=2 readonly>
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
            <input type="text" id="puntuacion" name="Puntuacion" value="">
            <br>
            <br>
            <input type="submit" name="Enviar" id="enviar" value="Enviar">
        </form>
    </div>
    

    <script src="./js/game.js"></script>
    <script src="./js/index.js"></script>
    <?php
            }
            else
            {
              header("Location:../../index.php");
              exit();
            }
         }
         else
         {
           header("Location:../../index.php");
           exit();
         }
    ?>
    
</body>
</html>