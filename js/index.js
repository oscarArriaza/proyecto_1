// Control de button back-to-top

// Obtenemos el button
let backToTop = document.getElementById('back-to-top');

// Progrmamos cuando el boton se muestre mediante una funcion

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let scrollTop = window.scrollY;
    let windowHeight = document.documentElement.clientHeight;

    console.log(scrollTop, windowHeight); // Agrega esta línea

    if (scrollTop > windowHeight ) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
}

// Añadimos la funcion al boton

backToTop.addEventListener('click', function() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE y opera
});

// ROADMAP

// Añadir Link a cada stage de Roadmap

const stages = document.querySelectorAll('.card-stage');
//const urls = ['#', '#', '#', '#'];

let urls1 = ["./juegos/españa/index.php", "#", "#", "#"];
let urls2 = ["./juegos/españa/index.php", "./juegos/brasil/index.php", "#", "#"];
let urls3 = ["./juegos/españa/index.php", "./juegos/brasil/index.php", "./juegos/kenia/index.php", "#"];
let urls4 = ["./juegos/españa/index.php", "./juegos/brasil/index.php", "./juegos/kenia/index.php", "./juegos/india/index.php"];

let listasDeUrls =[urls1, urls2, urls3, urls4];

stages.forEach
(
    function(div, i)
    {
        div.addEventListener
        (
            'click',
            function()
            {
                let juegosDesbloqueados=document.getElementById('juegosDesbloqueados').value;
                juegosDesbloqueados=parseInt(juegosDesbloqueados);
                juegosDesbloqueados=juegosDesbloqueados-1;
                window.location.href = listasDeUrls[juegosDesbloqueados][i];
                if(listasDeUrls[juegosDesbloqueados][i] === "#")
                {
                    //console.log(juegosDesbloqueados);
                    alert("Para desbloquear este juego, debes completar los anteriores.");
                }
            }
        );
    }
);

// scroll sections

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                let navLink = document.querySelector('.navbar-nav .nav-item a[href*=' + id + ']');
                if (navLink) {
                    navLink.classList.add('active');
                }
                let header = document.querySelector('header');
                header.classList.toggle('sticky', window.scrollY > 100);
            });
        }
    });
}

// Comportamiento del contenedor roadmp-stages
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var seccion1 = document.querySelector('.home');
    var seccion2 = document.querySelector('.roadmap');
    var titulo = document.getElementById('titleRoadmap');
    var contenedor = document.querySelector('.stages-container');

    if (scrollPosition >= seccion1.offsetHeight) {
        titulo.style.opacity = '1';
        contenedor.style.opacity = '1';
        contenedor.style.transform = 'translateY(50%)';
        seccion2.style.padding = '10rem 0 0';
        
    } else {
        contenedor.style.transform = 'translateY(-50%)';
        seccion2.style.padding = '0';
    }
});

/* animacion para cada stage */

let stagesA = document.querySelectorAll('.card-stage');
let j = 0;

function animate() {
    if (j < stagesA.length) {
        let stageA = stagesA[j];
        if (stageA) {
            stageA.style.transform = 'translateY(-10%)';
            stageA.style.transform = 'transform 2s ease-in-out';
            setTimeout(() => {
                stageA.style.transform = 'translateY(0)';
                j = (j + 1) % stagesA.length;
                animate();
            }, 2000);
        } else {
            j = 0;
            animate();
        }
    }
}

animate(0);

// Manejo de Evento Click del Dropdown de Idioma y carga el idioma seleccionado
document.querySelectorAll('.menuIdioma .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        let text = this.textContent;
        let abbr = text.substring(0, 3).toUpperCase(); // Obtiene las 3 letras
        document.querySelector('#navbarIdioma').textContent = abbr;

        // Carga el archivo de idioma correspondiente
        let idioma = this.id; 
        fetch('/landingProyV2/lang/' + idioma + '.json')
        .then(response => response.json()).then(data => {
            // 'data' es el objeto JSON que acabas de cargar
            // Actualiza el texto en tu página web
            document.querySelectorAll('[data-translate]').forEach(function(element) {
                let key = element.getAttribute('data-translate');
                element.textContent = data[key];
            });
        });
    });
});