
document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        principal();
        function principal()
        {
            let botonesCambiarContrasenia=document.getElementsByName("cambiarContrasenia");
            for (const elemento of botonesCambiarContrasenia)
            {
                elemento.addEventListener
                (
                    "click", () =>
                    {
                        let dataIdUsuario=elemento.dataset.idusuario;
                        let inputTextIdDialog2=document.getElementById("id");
                        inputTextIdDialog2.value=dataIdUsuario;
                        dialogo2.showModal();
                    }
                );
            }

            let botonCambiarNombre=document.getElementsByName("cambiarNombre");
            botonCambiarNombre.addEventListener
            for (const elemento of botonCambiarNombre)
            {
                elemento.addEventListener
                (
                    "click", () =>
                    {
                        let dataIdUsuario=elemento.dataset.idusuario;
                        let inputTextIdDialog3=document.getElementById("id2");
                        inputTextIdDialog3.value=dataIdUsuario;
                        dialogo3.showModal();
                    }
                );
            }

            let cambiar = document.getElementById("cambiar");
            cambiar.addEventListener
            (
                "click",
                function()
                {
                    let validacionCampoVacioContrasenia=false;
                    let validacionCaracteresExtraniosContrasenia=false;
                    let caracteresProhibidosContrasenia="contiene ñ";
                    let mensajeCaracteresExtraniosContrasenia="El campo "+"\"Contraseña\""+" no puede contener "+"\"ñ\""+" o "+"\"\\"+"\""+".";
                    let validacionLongitudContrasenia=false;
                    let numeroDeCaracteresPermitidosContrasenia=16;
                    let campoContraseniaPasoTodasLasValidaciones=false;
                    const contrasenia = document.getElementById("contrasenia");
                    validacionCampoVacioContrasenia=verificarQueElCampoNoEsteVacio(validacionCampoVacioContrasenia,contrasenia);
                    validacionCaracteresExtraniosContrasenia=verificarQueElCampoNoContengaCaracteresExtranios(validacionCaracteresExtraniosContrasenia,contrasenia,caracteresProhibidosContrasenia,mensajeCaracteresExtraniosContrasenia);
                    validacionLongitudContrasenia=verificarLongitud(validacionLongitudContrasenia,contrasenia,numeroDeCaracteresPermitidosContrasenia);

                    let validacionCoincidenciaContrasenia=false;
                    let campoConfirmarContraseniaPasoTodasLasValidaciones=false;
                    const confirmarContrasenia=document.getElementById("confirmarContrasenia");
                    validacionCoincidenciaContrasenia=verificarQueLosCamposCoincidan(validacionCoincidenciaContrasenia,confirmarContrasenia,contrasenia);

                    if(validacionCampoVacioContrasenia&&validacionCaracteresExtraniosContrasenia&&validacionLongitudContrasenia)
                    {
                        const mensajeError = document.getElementById("mensajeValidacionContrasenia");
                        mensajeError.textContent = "";
                        campoContraseniaPasoTodasLasValidaciones=true;
                    }

                    if(validacionCoincidenciaContrasenia)
                    {
                        const mensajeError = document.getElementById("mensajeValidacionConfirmarContrasenia");
                        mensajeError.textContent = "";
                        campoConfirmarContraseniaPasoTodasLasValidaciones=true;
                    }

                    if(!campoContraseniaPasoTodasLasValidaciones&&campoConfirmarContraseniaPasoTodasLasValidaciones)
                    {
                        event.preventDefault();
                    }
                }
            );

            let cambiar2=document.getElementById("cambiar2");
            cambiar2.addEventListener
            (
                "click",
                function()
                {
                    let validacionCampoVacioNombre=false;
                    let validacionCaracteresExtraniosNombre=false;
                    let caracteresProhibidosNombre="caracteres fuera del alfabeto español";
                    let mensajeCaracteresExtraniosNombre="El campo "+"\"Nombre de usuario\""+" solo puede contener letras del alfabeto español.";
                    let validacionLongitudNombre=false;
                    let numeroDeCaracteresPermitidosNombre=35;
                    let campoNombrePasoTodasLasValidaciones=false;
                    const nombre = document.querySelector("#nombreDeUsuario");
                    validacionCampoVacioNombre=verificarQueElCampoNoEsteVacio(validacionCampoVacioNombre,nombre);
                    validacionCaracteresExtraniosNombre=verificarQueElCampoNoContengaCaracteresExtranios(validacionCaracteresExtraniosNombre,nombre,caracteresProhibidosNombre,mensajeCaracteresExtraniosNombre);
                    validacionLongitudNombre=verificarLongitud(validacionLongitudNombre,nombre,numeroDeCaracteresPermitidosNombre);

                    if(validacionCampoVacioNombre&&validacionCaracteresExtraniosNombre&&validacionLongitudNombre)
                    {
                        const mensajeError = document.querySelector("#mensajeValidacionNombreDeUsuario");
                        mensajeError.textContent = "";
                        campoNombrePasoTodasLasValidaciones=true;
                    }

                    if(!campoNombrePasoTodasLasValidaciones)
                    {
                        event.preventDefault();
                    }
                }
            );

            /*let aniadirAdministrador=document.getElementById("aniadirAdministrador");
            aniadirAdministrador.addEventListener
            (
                "click",
                function()
                {
                    dialogo4.showModal();
                }
            );*/
        }
        function verificarQueElCampoNoEsteVacio(validacionCampoVacio,elementoInput)
        {
            // Elimina los espacios en blanco del valor del elemento input
            let elementoInputSinEspacios = elementoInput.value.trim();

            // Verifica si el campo nombre está vacío
            if (elementoInputSinEspacios === "")
            {
                // El campo nombre está vacío
                // Muestra un mensaje de error
                let mensajeError = document.getElementById("mensajeValidacion"+elementoInput.name);
                mensajeError.style.color = "red";
                mensajeError.textContent = "Este campo no puede quedar vacío.";

                // Evita que el formulario se envíe
                event.preventDefault();
            }
            else
            {
                validacionCampoVacio=true;
            }
            return validacionCampoVacio;
        }
        function verificarQueElCampoNoContengaCaracteresExtranios(seEncontraronCaracteresExtranios,elementoInput,caracteresProhibidos,mensaje)
        {
            if(caracteresProhibidos==="caracteres fuera del alfabeto español")
            {
                // Verifica si el campo nombre tiene algún caracter que no sea una letra del alfabeto español
                const contieneCaracteresNoEspanoles=/[^a-záéíóúüññç\s]/i.test(elementoInput.value);
                imprimirMensaje(contieneCaracteresNoEspanoles);
            }
            else
            {
                const contieneCaracteresProhibidosParaContrasenias=/[ñ\\]/i.test(elementoInput.value);
                imprimirMensaje(contieneCaracteresProhibidosParaContrasenias);
            }

            function imprimirMensaje(elCampoPasoLaVerificacion)
            {
                // Si el campo nombre tiene algún caracter que no sea una letra del alfabeto español, muestra un mensaje de error
                if (elCampoPasoLaVerificacion)
                {
                    // El campo nombre tiene algún caracter que no sea una letra del alfabeto español
                    // Muestra un mensaje de error
                    const mensajeError = document.querySelector("#mensajeValidacion"+elementoInput.name);
                    mensajeError.style.color = "red";
                    mensajeError.textContent = mensaje;

                    // Evita que el formulario se envíe
                    event.preventDefault();
                }
                else
                {
                    seEncontraronCaracteresExtranios=true;
                }
            }
            return seEncontraronCaracteresExtranios;
        }
        function verificarLongitud(validacionLongitud,elementoInput,numeroDeCaracteresPermitidos)
        {
            // Verifica si la longitud del campo nombre es menor a 35
            const longitudInvalida = elementoInput.value.length >= numeroDeCaracteresPermitidos;

            // Si la longitud del campo nombre es mayor o igual a 35, muestra un mensaje de error
            if (longitudInvalida)
            {
                // Muestra un mensaje de error
                const mensajeError = document.querySelector("#mensajeValidacion"+elementoInput.name);
                mensajeError.style.color = "red";
                mensajeError.textContent = "La longitud de este campo debe ser menor a "+numeroDeCaracteresPermitidos+" caracteres.";

                // Evita que el formulario se envíe
                event.preventDefault();
            }
            else
            {
                validacionLongitud=true;
            }
            return validacionLongitud;
        }
        function verificarQueLosCamposCoincidan(losCamposCoinciden,elementoInputUno,elementoInputDos)
        {
            let valorElementoInputUno=elementoInputUno.value;
            let valorElementoInputDos=elementoInputDos.value;
            if (valorElementoInputUno!==valorElementoInputDos)
            {
                // Muestra un mensaje de error
                const mensajeError = document.querySelector("#mensajeValidacion"+elementoInputUno.name);
                mensajeError.style.color = "red";
                mensajeError.textContent = "Las contraseñas no coinciden.";

                // Evita que el formulario se envíe
                event.preventDefault();
            }
            else
            {
                losCamposCoinciden=true;
            }
            return losCamposCoinciden;
        }
    }
);
