
let cartasFacil = [ 'laia1.png', 'alisha.png', 'laia1.png', 'alisha.png'];
let cartasNormal = [ '8.png', '2.png', '18.png', '4.png', '8.png', '2.png', '18.png', '4.png'];
let cartasDificil = ['elefanteNew.gif', '3.gif', '4.gif', 'flor.gif', 'mujer.gif', 'sol.gif',  'elefanteNew.gif', '3.gif', '4.gif', 'flor.gif', 'mujer.gif', 'sol.gif'];
let indiceNivelActual = 0;
const niveles = [cartasFacil, cartasNormal, cartasDificil];
let tablero = document.getElementById('tablero');
let cartasSeleccionadas = [];
let cartasAdivinadas = [];
let arraySeleccionado = [];
let tiempo;
let intervalo;
let tiempoRestante;


function barajar(array) {
  let indice_temporal = array.length;
  let valor_temporal;
  let random_indice;
  while (indice_temporal !== 0) {
    random_indice = Math.floor(Math.random() * indice_temporal);
    indice_temporal -= 1;
    valor_temporal = array[indice_temporal];
    array[indice_temporal] = array[random_indice];
    array[random_indice] = valor_temporal;
  }
  return array;
}

function iniciarJuego(nivel) {
  
  if (nivel === 'facil') {
    arraySeleccionado = cartasFacil; // conjunto actual de cartas
    cartasFacil = barajar(arraySeleccionado);
  } 
  else if (nivel === 'normal') {
    arraySeleccionado = cartasNormal; // conjunto actual de cartas
    cartasNormal = barajar(arraySeleccionado); 
     
  
    
  }else if (nivel === 'dificil') {
    arraySeleccionado = cartasDificil; // conjunto actual de cartas
    cartasDificil = barajar(arraySeleccionado);
  }
  tiempo = 60;
  tablero.innerHTML = '';
  const imagenComun = 'logo_india.png'; // Ruta de la imagen común

  arraySeleccionado.forEach((carta, index) => {
    
    const cartaElemento = document.createElement('div');
    cartaElemento.classList.add('card');
    cartaElemento.dataset.index = index;
    const imagen = document.createElement('img');
    imagen.src = `img/${imagenComun}`; // Ruta de la imagen común
    imagen.classList.add('imagen-carta');
    cartaElemento.appendChild(imagen);
    cartaElemento.addEventListener('click', () => voltearCarta(index));
    tablero.appendChild(cartaElemento);

    const juego = document.getElementById('juego');
    juego.style.border = '7px rgb(252, 141, 114, 0.60) outset';

    // Ocultar boton de 'jugar'
   // const botonIniciar = document.getElementById('botonIniciar');
   // botonIniciar.style.display = 'none';

    const botonFacil = document.getElementById('botonFacil');
    botonFacil.style.display = 'none';


    //const botonNormal = document.getElementById('botonNormal');
   // botonNormal.style.display = 'none';

   // const botonDificil = document.getElementById('botonDificil');
  //  botonDificil.style.display = 'none';

    // Mostrar el boton de 'reiniciar'
    const botonReiniciar = document.getElementById('botonReiniciar');
    botonReiniciar.style.display = 'block';

    const botonSalir = document.getElementById('botonSalir');
    botonSalir.style.display = 'block';

   

   // const bienvenida = document.getElementById('mensajeBienvenida');
   // bienvenida.style.display = 'none';
    
        // Mostrar el contador
        const contador = document.getElementById('contador');
        contador.style.display = 'block';

        const menu = document.getElementById('menu');
        menu.style.display = 'flex';
  });
  
      // Iniciar el contador
      iniciarContador();
   
}
function iniciarContador(){
  intervalo = setInterval(actualizarContador, 1000); // Actualizar cada segundo
}

function actualizarContador() {
  tiempo--;
  document.getElementById('tiempo').textContent = tiempo;

  if (tiempo <= 0) {
    Swal.fire({
      title: '¡Has perdido!',
      text: 'Se agotó el tiempo.',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reiniciar juego',
      cancelButtonText: 'Salir',

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `},
      hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
      },
    }).then((result) => {
      if (result.isConfirmed) {
        reiniciarJuego();
      } else {
        // Agrega aquí cualquier lógica adicional para salir
        Swal.fire({
          title: '¡Hasta luego!',
          icon:  'success',
          showConfirmButton: false,
          timer:1500,
        })
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }
    });

    clearInterval(intervalo); // Detener el contador
  }
}



function voltearCarta(index) {
  if (cartasSeleccionadas.length < 2 && !cartasSeleccionadas.includes(index) 
  && !cartasAdivinadas.includes(index)) {

    const cartaElemento = document.querySelector(`[data-index="${index}"]`);
    const imagen = cartaElemento.querySelector('.imagen-carta');

    cartaElemento.classList.add('volteada'); // Clase para activar la animación
    
    // Cambiar la imagen de la carta para mostrar la del array
    imagen.src = `img/${arraySeleccionado[index]}`;
    
    cartaElemento.classList.add('seleccionada');
    
    cartasSeleccionadas.push(index);
   

    if (cartasSeleccionadas.length === 2) {
      setTimeout(verificarCoincidencia, 800);
    }
  }
}

let puntajeFacil = 0;
let puntajeNormal = 0;
let puntajeDificil = 0;

function cargarSiguienteNivel() {
  if (indiceNivelActual < niveles.length ) {
    const puntaje = calcularPuntaje(tiempo);

    if (indiceNivelActual === 0) { 
      puntajeFacil = puntaje;
      localStorage.setItem("puntajeFacil", puntajeFacil);
      console.log(puntajeFacil);
      indiceNivelActual++;
      arraySeleccionado = barajar(niveles[indiceNivelActual]);
      iniciarJuego(niveles[indiceNivelActual]);
     } 
     else if (indiceNivelActual === 1) { 
      puntajeNormal = puntaje;
      localStorage.setItem("puntajeNormal", puntajeNormal);
      console.log(puntajeNormal);
      indiceNivelActual++;
      arraySeleccionado = barajar(niveles[indiceNivelActual]);
      iniciarJuego(niveles[indiceNivelActual]);
     }
     else if (indiceNivelActual === 2) {  
      puntajeDificil = puntaje;
      localStorage.setItem("puntajeDificil", puntajeDificil);
      console.log(puntajeDificil);
     }

  } 
}


function verificarCoincidencia() {
  const [index1, index2] = cartasSeleccionadas;
  const carta1 = arraySeleccionado[index1];
  const carta2 = arraySeleccionado[index2];
  const cartaElemento1 = document.querySelector(`[data-index="${index1}"]`);
  const cartaElemento2 = document.querySelector(`[data-index="${index2}"]`);

  if (carta1 === carta2) {
    cartasAdivinadas.push(index1, index2);

    cartaElemento1.classList.add('iluminar');
    cartaElemento2.classList.add('iluminar');

    // Agregar una pausa antes de quitar la clase
    setTimeout(() => {
      cartaElemento1.classList.remove('iluminar');
      cartaElemento2.classList.remove('iluminar');
      
    }, 2000); // Ajusta el tiempo de pausa según la duración de la animación

    if (cartasAdivinadas.length === arraySeleccionado.length) {
      clearInterval(intervalo); // Detener el contador
      tablero.classList.add('iluminar-tablero');
      
      setTimeout(() => {
        if (arraySeleccionado !== cartasDificil) {
          Swal.fire({
            title: " ",
            width: 600,
            padding: '7em',
            background: "#fff url(img/ganaste.gif)",
            backdrop: `
              rgba(0,0,0,0.8)
              no-repeat
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            html: '<button id="siguienteNivel" class="swal2-confirm swal2-styled">Siguiente Nivel</button>',
            customClass: {
              popup: 'custom-popup-class'
            }
          });
          
          // Estilo CSS para posicionar el botón en la esquina derecha
          const botonSiguienteNivel = document.getElementById('siguienteNivel');
          botonSiguienteNivel.style.position = 'absolute';
          botonSiguienteNivel.style.bottom = '240px';  // Ajusta la posición vertical según tus necesidades
          botonSiguienteNivel.style.right = '200px';  // Ajusta la posición horizontal según tus necesidades
          
          // Agregar evento al botón personalizado para redirigir al siguiente nivel
          botonSiguienteNivel.addEventListener('click', function () {
            cargarSiguienteNivel();
            reiniciarJuego();
            Swal.close();

          });

        } else {
          cargarSiguienteNivel();
          const puntajeTotal = puntajeFinal();
          Swal.fire({
            title: '<span style="color:#345675; font-size: 18px; font-family: var(--fontTitleH);">Tu puntaje es:</span>',
            html: `<span style="color:#FDAE43; font-size: 30px;  font-family: var(--fontTitleH);"> ${puntajeTotal} puntos </span>`,
            imageUrl: 'img/LaiasBITMOJI/super awesome.png',  
            imageWidth: 400,
            imageHeight: 390,
            imageAlt: 'Imagen de felicitación',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir',
            customClass: {
              popup: 'custom-popup-class'
            }
          }).then((result) => {
            if (result.isConfirmed) {

              document.getElementById("formularioPuntaje").submit();

            }
        })
        }
      }, 1000);
    }
    
    
   

  } else {
    cartaElemento1.classList.remove('seleccionada');
    cartaElemento2.classList.remove('seleccionada');

     // Volver a colocar la imagen común
     const imagen1 = cartaElemento1.querySelector('.imagen-carta');
     const imagen2 = cartaElemento2.querySelector('.imagen-carta');
     
     imagen1.src = 'img/logo_india.png'; // Ruta de la imagen común
     imagen2.src = 'img/logo_india.png'; // Ruta de la imagen común

     cartaElemento1.classList.remove('volteada'); 
     cartaElemento2.classList.remove('volteada'); 
     
  }
  cartasSeleccionadas = [];
}

function reiniciarJuego() {
  // Agregar clase para animación
  tablero.classList.add('reiniciar-animacion');

  // Esperar 1 segundo antes de continuar con el código
  setTimeout(() => {
    // Quitar la clase de animación
    tablero.classList.remove('reiniciar-animacion');

    // Limpiar intervalo y reiniciar juego
    cartasAdivinadas = [];
    clearInterval(intervalo);

    if (arraySeleccionado === cartasFacil) {
      
      iniciarJuego('facil');
    } else if (arraySeleccionado === cartasNormal) {
  
      iniciarJuego('normal');
    } else if (arraySeleccionado === cartasDificil) {

      iniciarJuego('dificil');
    }
  }, 1000); // Esperar 1 segundo.
}



function confirmarSalida() {
  clearInterval(intervalo); // Pausar el tiempo
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Si sales, perderás tu progreso en el juego.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, salir',
    cancelButtonText: 'Cancelar', 
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `},
    hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
    },
      
    customClass: {
      popup: 'custom-popup-class'
    }
    
    
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '¡Hasta luego!',
        icon:  'success',
        showConfirmButton: false,
        timer:1500,
      })
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }  else {
      // Reanudar el tiempo si el usuario decide no salir
      iniciarContador();
    }
  
  });
}
/*-------------------------- Puntajes ----------------------------*/




function calcularPuntaje(tiempo) {
  const puntajeMaximo = 100;
  const tiempoMaximo = 60; // Ajusta según la duración máxima del nivel en segundos

  // Calcula el puntaje en base al porcentaje de tiempo restante
  let porcentajeTiempoRestante = (tiempo / tiempoMaximo) * 100;
  let puntajeCalculado = Math.round(puntajeMaximo * (porcentajeTiempoRestante / 100));

   return puntajeCalculado;
 }

 
 function puntajeFinal() {
  // Recuperar puntajes almacenados
  puntajeFacil = parseInt(localStorage.getItem("puntajeFacil")) || 0;
  puntajeNormal = parseInt(localStorage.getItem("puntajeNormal")) || 0;
  puntajeDificil = parseInt(localStorage.getItem("puntajeDificil")) || 0

  // Calcular puntaje total
  var puntajeTotal = puntajeFacil + puntajeNormal + puntajeDificil;
 
 let puntuacion=document.getElementById("puntuacion");
 puntuacion.value=puntajeTotal;

 return puntajeTotal;
}




/*--------------------------------------------------------------------------*/



