// Obtenemos el mapa del html
let mapElement = document.getElementById('mapa');

// Mapa del Juego
const mapaGame = [
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',  'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'T', 'T', 'T', 'T', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',  'E', 'E', 'E',  0,   0,   0,   0,   0,  'T', 'W'],
    ['W', 'P', 'P',  0,   0,  'E',  0,  'E',  0,  'E',  0,    0,  0,   0,    0,   0,  'E', 'E', 'E',  0,   0,   0,  'T', 'W'],
    ['W',  0,  'P',  0,   0,  'P', 'P', 'P', 'P', 'P', 'P', 'P',  0,   0,    0,   0,   0,   0,  'E',  0,   0,   0,   0,  'W'],
    ['W',  0,  'P',  0,   0,  'P',  2,  'P',  0,   0,   0,  'P',  0,  'T',   0,   0,   0,   0,  'S',  0,   0,   0,   0,  'W'],
    ['W',  0,  'P', 'P', 'P', 'P', 'P', 'P',  0,  'T',  0,  'P',  0,   0,    0,   0,   0,   0,   0,   0,   0,   0,  'T', 'W'],
    ['W',  0,  'P',  0,   0,   0,   0,   0,   0,   0,   0,  'P', 'P', 'P',   0,   0,   0,   0,   0,   0,   0,   0,  'T', 'W'],
    ['W', 'P', 'P', 'P',  0,   0,   0,   0,   0,   0,   0,   0,   0,  'P',   0,   0,  'P', 'P', 'P', 'P', 'P', 'P', 'T', 'W'],
    ['W', 'P',  1,  'P', 'T',  0,   0,  'C',  0,   0,   0,   0,  'P', 'P',  'P',  0,  'P',  0,   0,   0,   0,  'P',  0,  'W'],
    ['W', 'P', 'P', 'P',  0,   0,   0,   0,   0,   0,   0,   0,  'P',  3,   'P', 'P', 'P',  0,  'C', 'C',  0,  'P', 'P', 'D'],
    ['W', 'T',  0,  'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'P', 'P',  'P', 'T',  0,   0,   0,   0,   0,   0,  'T', 'W'],
    ['W', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R',  'R', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
];

function crearDiv(celda, cellIndex, rowIndex) {
    let div = document.createElement('div');
    
        // div.className = celda;
        switch (celda) {
            case 'W':
                div.className = 'wall';
                break;
            case 'P':
                div.className = 'path'
                break;
            case 0:
                div.className = 'grass'
                break;
            case 1:
                div.className = 'repto1'
                break;
            case 2:
                div.className = 'repto2'
                break;
            case 3:
                div.className = 'repto3'
                break;
            case 'T':
                div.className = 'tree';
                break;
            case 'R':
                div.className = 'river';
                break;
            case 'E':
                div.className = 'electric';
                break;
            case 'S':
                div.className = 'school';
                break;
            case 'C':
                div.className = 'center-eolic';
                break;
            case 'D':
                div.className = 'door';
                break;
            default:
                break;
        }
        
        div.style.gridColumnStart = cellIndex + 1;
        div.style.gridRowStart = rowIndex + 1;
    
    return div;
}

function createMap(map) {
    
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        let row = map[rowIndex];
        for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
            let celda = row[cellIndex];
            let div = crearDiv(celda, cellIndex, rowIndex);
            div.id = 'cell-' + rowIndex + '-' + cellIndex; // Asiga un ID unico a ca cada div
            mapElement.appendChild(div);
        }
    }    
}

createMap(mapaGame);

// Crear el elemento del personaje
const personaje = document.createElement('div');
personaje.className = 'character';
personaje.style.backgroundImage = 'url(./media/laia-gift/laia-down.gif)';
personaje.style.backgroundPosition = 'center';
personaje.style.backgroundRepeat = 'no-repeat';
personaje.style.gridColumnStart = 3;
personaje.style.gridRowStart = 3;


// Agrego el personaje al mapa
mapElement.appendChild(personaje);

// Posicion inicial del personaje
let fila = 2;
let columna = 2;

let escenario;

// Obtener el Modal del juego
const modal1 = new bootstrap.Modal(document.getElementById('modal1'));
const modal2 = new bootstrap.Modal(document.getElementById('modal2'));
const modal3 = new bootstrap.Modal(document.getElementById('modal3'));

// Mover el personaje con las teclas de flechas
document.addEventListener('keydown', function(event) {
    let nuevaFila = fila;
    let nuevaColumna = columna;

    switch (event.key) {
        case 'ArrowUp':
            personaje.style.backgroundImage = 'url(./media/laia-gift/laia-up.gif)';
            nuevaFila--;
            break;
        case 'ArrowDown':
            personaje.style.backgroundImage = 'url(./media/laia-gift/laia-down.gif)';
            nuevaFila++;
            break;
        case 'ArrowLeft':
            personaje.style.backgroundImage = 'url(./media/laia-gift/laia-left.gif)';
            nuevaColumna--;
            break;
        case 'ArrowRight':
            personaje.style.backgroundImage = 'url(./media/laia-gift/laia-right.gif)';
            nuevaColumna++;
            break;
    }

    // Verificamos si la nueva posicion es valida
    if (nuevaFila >= 0 && nuevaFila < mapaGame.length && nuevaColumna >= 0 && nuevaColumna < mapaGame[0].length) {
        if (mapaGame[nuevaFila][nuevaColumna] === 'P') {
            fila = nuevaFila;
            columna = nuevaColumna;

            personaje.style.gridColumnStart = columna + 1;
            personaje.style.gridRowStart = fila + 1;
        } else if (mapaGame[nuevaFila][nuevaColumna] === 1) { // primerPunto
            Swal.fire({
                title: '¿Quieres empezar el Primer reto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            })
            .then((result) => {
                if (result.isConfirmed) {
                    escenario = 1;
                    modal1.show();
                }
            });
            
        } else if (mapaGame[nuevaFila][nuevaColumna] === 2){
            Swal.fire({
                title: '¿Quieres empezar el segundo reto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            })
            .then((result) => {
                if (result.isConfirmed) {
                    escenario = 2;
                    modal2.show();
                }
            });
        } else if (mapaGame[nuevaFila][nuevaColumna] === 3) {
            Swal.fire({
                title: '¿Quieres empezar el Tercer reto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                reverseButtons: true
            })
            .then((result) => {
                if (result.isConfirmed) {
                    escenario = 3;
                    modal3.show();
                }
            });
        } else if (mapaGame[nuevaFila][nuevaColumna] === 'D') {
            // Verificar si se han completado las misiones
            if (bombillasObtenidas.innerText !== '0' && cablesObtenidos.innerText !== '0' && panelesObtenidos.innerText !== '0') {
                // Mostrar mensaje de salida
                Swal.fire({
                    title: '¡Felicidades!',
                    text: 'Laia ha completado las misiones en Brasil.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    // Redirigir al usuario a el index de la landing y enviar puntuaciones
                    if (result.isConfirmed) {
                        window.location.href = '../../index.php';
                        puntajeForm.value = totalPuntos;
                        document.getElementById('formularioPuntaje').submit();
                    }
                });
            } else {
                // Mostrar mensaje de que aún no se han completado las misiones y preguntar si quiere salir de todas formas
                Swal.fire({
                    title: 'Aún no has completado las misiones',
                    text: '¿Quieres salir del mapa de todas formas?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, salir',
                    cancelButtonText: 'No, quedarme'
                }).then((result) => {
                    // Redirigir al usuario al index de la landing aunque no haya completado las misiones
                    if (result.isConfirmed) {
                        window.location.href = '../../index.php';
                    } else {
                        // Posicionar al personaje a la entrada del mapa

                    }
                });
            }
        }
    }
});

// Manejar el comportamiento del modal

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName('close')[0];