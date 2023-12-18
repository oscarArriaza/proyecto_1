// Variables globales
let puntos;

// DEfino el estado para modal, si ha sido completado
let juegoCompletadoModal1 = false;
let juegoCompletadoModal2 = false;
let juegoCompletadoModal3 = false;

// Elementos del modal para mostrar puntos

let bombillasObtenidas = document.getElementById('bombillasObtenidas');
let cablesObtenidos = document.getElementById('cablesObtenidos');
let panelesObtenidos = document.getElementById('panelesObtenidos');

// Puntos Globales obtenidos 
let totalPuntos = 0;
let totalPuntosElem = document.getElementById('totalPuntos');
let puntajeForm = document.getElementById('puntuacion');

// Funcion principal para jugar
function jugar(modalId) {
    // Antes de iniciar un juego verificar estado (terminado)
    if (modalId === 'modal1' && juegoCompletadoModal1) {
        reiniciarEstadoJuego();  
    } else if (modalId === 'modal2' && juegoCompletadoModal2) {
        reiniciarEstadoJuego();  
    } else if (modalId === 'modal3' && juegoCompletadoModal3) {
        reiniciarEstadoJuego();  
    }
    // Obtener los elementos del juego (Modal)
    let palabraAtraducir = document.getElementById(modalId + '-palabra');
    let option1 = document.getElementById(modalId + '-option1');
    let option2 = document.getElementById(modalId + '-option2');
    let option3 = document.getElementById(modalId + '-option3');
    let tiempoPorPalabra = document.getElementById(modalId + '-temporizador');
    puntos = document.getElementById(modalId + '-puntos');

    // Establecer que subarray de palabras usar en funcion de la situacion
    let palabrasPorUsar;
    switch (escenario) {
        case 1:
            palabrasPorUsar = palabras1;
            break;
        case 2:
            palabrasPorUsar = palabras2;
            break;
        case 3:
            palabrasPorUsar = palabras3;
            break;
        default:
            break;
    }

    // ---

    if (temporizador) {
        clearInterval(temporizador);
    }

    if (palabrasUtilizadas === 0) {
        palabrasObtenidas = [];
    }

    palabraElegida = getPalabra(palabrasPorUsar);
    console.log(palabraElegida);
    let tiempoRestante = 20;

    temporizador = setInterval(function () {
        tiempoRestante--;

        tiempoPorPalabra.innerHTML = tiempoRestante;

        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            mostrarResultado(false, modalId);
        }

    }, 1000);

    palabraAtraducir.textContent = palabraElegida.palabra;
    option1.textContent = palabraElegida.alternativas[0];
    option2.textContent = palabraElegida.alternativas[1];
    option3.textContent = palabraElegida.alternativas[2];

    // Agregar evento de click para las opciones
    let btnAlternativas = document.querySelectorAll('.btn-option');

    btnAlternativas.forEach((btnOption) => {
        btnOption.removeEventListener('click', controlarClick);
        btnOption.dataset.modalId = modalId;
        btnOption.addEventListener('click', controlarClick); // 
    });

    console.log(modalId);
}

// Banco de Palabras y sus respectivas alternativas
const palabras = [
    { 
        palabra: 'bombeta LED', 
        alternativas: ['bombiña', 'lâmpada elétrica', 'luz LED'],
        correcta: 'lâmpada elétrica'
    },
    {
        palabra: 'energia elèctrica',
        alternativas: ['forza eléctrica', 'electricity', 'energia elétrica'],
        correcta: 'energia elétrica'
    },
    {
        palabra: 'energia',
        alternativas: ['energia', 'força', 'energiña'],
        correcta: 'energia'
    },
    {
        palabra: 'energia eòlica',
        alternativas: ['energia do vento', 'energia eólica', 'força do vento'],
        correcta: 'força do vento',
    },
    {
        palabra: 'energia renovable',
        alternativas: ['energia renovable', 'energia renovável', 'Ambas'],
        correcta: 'energia renovável'
    },
    {
        palabra: "estalvi d'energia",
        alternativas: ['reduçao de energia', 'ahorro de energia', 'economia de energia'],
        correcta: 'economia de energia'
    },
    {
        palabra: 'energia hidroelèctrica',
        alternativas: ['energia hidrelétrica', 'energia de água', 'energia do agua'],
        correcta: 'energia hidrelétrica'
    },
    {
        palabra: 'canvi climàtic',
        alternativas: ['mudança climática', 'alterações climáticas', 'N.A'],
        correcta: 'alterações climáticas'
    },
    {
        palabra: 'panell solar',
        alternativas: ['placa do sol', 'solar painer', 'painel solar'],
        correcta: 'painel solar'
    },
    {
        palabra: 'bateria solar',
        alternativas: ['bateria solar', 'bateria do sol', 'bateria'],
        correcta: 'bateria solar'
    },
    {
        palabra: 'carregador solar',
        alternativas: ['carregador solar', 'cargador do sol', 'N.A'],
        correcta: 'carregador solar'
    },
    {
        palabra: 'electricitat',
        alternativas: ['electricidad', 'electrici', 'electricidade'],
        correcta: 'electricidade'
    },
    {
        palabra: 'reciclatge',
        alternativas: ['reciclando', 'reciclaje', 'reciclage'],
        correcta: 'reciclando'
    },
    {
        palabra: 'energia solar',
        alternativas: ['energia solar', 'energia de sol', 'energia do sol'],
        correcta: 'energia solar'
    },
    {
        palabra: 'central elèctrica',
        alternativas: ['central eléctrica', 'estacão eléctrica', 'posto eléctrico'],
        correcta: 'central eléctrica'
    }
];

// Divido el array de palabras en 3 subarray para cada punto del juego
const palabras1 = palabras.slice(0, 5);
const palabras2 = palabras.slice(5, 10);
const palabras3 = palabras.slice(10, 15);

// Variables para el juego
let tiempoPorPalabra;

tiempoPorPalabra = document.getElementById('temporizador');

let temporizador;
let palabrasUtilizadas = 0;
let puntosObtenidos = 0;
let enJuego = true;
let palabraElegida;

// Variable global para btnSelected
let btnSelected;

function mostrarMensajeJuegoCompletado() {
    alert('El juego se ha completado');
}

function reiniciarEstadoJuego() {
    juegoCompletadoModal1 = false;
    juegoCompletadoModal2 = false;
    juegoCompletadoModal3 = false;
    
}

function mostrarResultado(finalizarJuego, modalId) {
    
    if (!enJuego) {
        return;
    }

    enJuego = false;

    let mensaje;

    if (finalizarJuego) {
        // Acciones adicionales al finalizar el juego
        puntos.textContent = puntosObtenidos;

        switch (escenario) {
            case 1:
                bombillasObtenidas.innerText = puntosObtenidos;
                break;
            case 2:
                cablesObtenidos.innerText = puntosObtenidos;
                break;
            case 3:
                panelesObtenidos.innerText = puntosObtenidos
                break;
            default:
                break;
        }

        //Actualiza el total de puntos acumulados
        totalPuntos += puntosObtenidos;

        // Actualizar el elemento HTML que muestra el total de puntos
        totalPuntosElem.textContent = totalPuntos;

        console.log(`Cerrando el modal ${modalId}`);
        //alert('Fin del juego');
        Swal.fire({
            title: 'Fin del juego',
            text: '¿Quieres continuar?',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            // Restablecer el estado para permitir que se inicie otro juego
            enJuego = true;
            
            // Cerrar el modal segun el modalId
            let modal;
            if (modalId === 'modal1') {
                //modal1.hide();
                modal = modal1;
            } else if (modalId === 'modal2') {
                //modal2.hide();
                modal = modal2;
            } else if (modalId === 'modal3') {
                //modal3.hide();
                modal = modal3;
            }

            // Cerrar el modal
            modal.hide();
            console.log(`Modal ${modalId} cerrado`);

        });

        // Reiniciar variables para el proximo juego
        palabrasUtilizadas = 0;
        puntosObtenidos = 0;

        // Continuar con el juego
        jugar(modalId)

        // Actualizar el estado del juego
        if (modalId === 'modal1') {
            juegoCompletadoModal1 = true;
        } else if (modalId === 'modal2') {
            juegoCompletadoModal2 = true;
        } else if (modalId === 'modal3') {
            juegoCompletadoModal3 = true;
        }

        reiniciarEstadoJuego();

        // Verificar si se han completado las 3 misiones
        if (bombillasObtenidas.innerText !== '0' && cablesObtenidos.innerText !== '0' && panelesObtenidos.innerText !== '0') {
            // Mostrar mensaje de haber completado las misiones y dirigir al jugador a un punto del mapa
            Swal.fire({
                title: '¡Felicidades!',
                text: 'Has completado todas las misiones. ¡Dirígete a la salida del mapa!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }

    } else {
        mensaje = btnSelected && validarRespuesta(btnSelected, palabraElegida.palabra) ? 'Correcto...!' : 'Haz fallado!';
        puntosObtenidos += btnSelected && validarRespuesta(btnSelected, palabraElegida.palabra) ? 10 : 1;

        alert(mensaje);

        // Reiniciar el juego despues de mostrar el resultado y completar
        if (palabrasUtilizadas >= 5) {
            palabrasUtilizadas = 0;
            puntos.textContent = puntosObtenidos;
            palabrasObtenidas = [];
            enJuego = true;
            jugar();
        } 
    }
}

// -----------

// Detener el temporizador cuando el modal se haya ocultado completamente --- modalJuegoE1
modal1.addEventListener('hidden.bs.modal', function() {
    console.log('Modal oculto');
    // Verifica que tiempoPorPalabra este definido antes de utilizarlo
    if (tiempoPorPalabra) {
        tiempoPorPalabra.innerText = '20';
    }
    
    clearInterval(temporizador);
});

// Iniciar el juego por primera vez cuando el modal se muestre  ---  modalJuegoE1
modal1.addEventListener('shown.bs.modal', function() {
    // Mover la inicialización del temporizador aquí para asegurarse de que se inicia después de mostrar el modal
    //reiniciarTemporizador();
    jugar('modal1');
});

modal2.addEventListener('hidden.bs.modal', function() {
    // Verifica que tiempoPorPalabra este definido antes de utilizarlo
    if (tiempoPorPalabra) {
        tiempoPorPalabra.innerText = '20';
    }
    
    clearInterval(temporizador);
});

// Iniciar el juego por primera vez cuando el modal se muestre  ---  modalJuegoE1
modal2.addEventListener('shown.bs.modal', function() {
    jugar('modal2');
});

modal3.addEventListener('hidden.bs.modal', function() {
    // Verifica que tiempoPorPalabra este definido antes de utilizarlo
    if (tiempoPorPalabra) {
        tiempoPorPalabra.innerText = '20';
    }
    
    clearInterval(temporizador);
});

// Iniciar el juego por primera vez cuando el modal se muestre  ---  modalJuegoE1
modal3.addEventListener('shown.bs.modal', function() {
    jugar('modal3');
});

// -----------

// Funciòn para obtener una palabra aleatoria que no se haya utilizado antes
function getPalabra(palabras) {
    let indice = Math.floor(Math.random() * palabras.length);
    let palabraSeleccionada = palabras[indice];

    if (palabrasObtenidas.includes(palabraSeleccionada)) {
        return getPalabra(palabras);
    } else {
        palabrasObtenidas.push(palabraSeleccionada);
        return {
            palabra: palabraSeleccionada.palabra,
            alternativas: palabraSeleccionada.alternativas
        };
    }
}

// Funcion para validar la respuesta seleccionada
function validarRespuesta(opcionSeleccionada, palabra) {
    let palabraCorrecta = palabras.find(p => p.palabra === palabra);
    return opcionSeleccionada === palabraCorrecta.correcta;
}

// Funcion para controlar el click en las opciones
function controlarClick(evento) {
    
    // Obten el modalId del atributo de datos
    let modalId = evento.target.dataset.modalId;

    btnSelected = evento.target.textContent;
    let esRespuestaCorrecta = validarRespuesta(btnSelected, palabraElegida.palabra);

    Swal.fire({
        title: esRespuestaCorrecta ? 'Es correcto...!' : 'Ups, haz fallado',
        icon: esRespuestaCorrecta ? 'success' : 'error',
        showConfirmButton: false,
        timer: 1500
    });

    puntosObtenidos += esRespuestaCorrecta ? 10 : 1;

    puntos.textContent = puntosObtenidos;

    palabrasUtilizadas++;

    // Validar si se han completado cinco palabras
    if (palabrasUtilizadas >= 5) {
        mostrarResultado(true, modalId);

        // Reiniciar variables para el proximo juego
        palabrasUtilizadas = 0;
        puntosObtenidos = 0;

        // Continuar con el juego
        jugar(modalId);
    } else {
        // Continuar con el juego
        jugar(modalId);
    }
}

// Mostrar Modal Bienvenida al cargar la pagina
const myModal = new bootstrap.Modal(document.getElementById('welcomeModal'), {});
myModal.show();

// Habilitar Popovers (Bootstrap v5.3)
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// Colorear titulo de modal bienvenida
let titleBienvenida = document.querySelector('#welcomeModal .modal-body h1').textContent;

let colors = ['#009735', '#F6D900', '#0F45AA'];
let coloredText = titleBienvenida.split('').map((char, index) => {
    let color = colors[index % colors.length];
    return `<span style="color: ${color}">${char}</span>`;
}).join('');

// Aplicar colores a title
document.querySelector('#welcomeModal .modal-body h1').innerHTML = coloredText;