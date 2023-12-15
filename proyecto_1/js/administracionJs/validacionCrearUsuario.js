document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        const crearUsuario = document.querySelector("#crearUsuario");

        // Agrega un oyente de eventos al botón enviar
        crearUsuario.addEventListener
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


                let validacionCampoVacioContrasenia=false;
                let validacionCaracteresExtraniosContrasenia=false;
                let caracteresProhibidosContrasenia="contiene ñ";
                let mensajeCaracteresExtraniosContrasenia="Es campo"+"\"Contraseña\""+" no puede contener "+"\"ñ\""+" o "+"\"\\"+"\""+".";
                let validacionLongitudContrasenia=false;
                let numeroDeCaracteresPermitidosContrasenia=16;
                let campoContraseniaPasoTodasLasValidaciones=false;
                let contrasenia = document.getElementById("contraseniaCrearUsuario");
                validacionCampoVacioContrasenia=verificarQueElCampoNoEsteVacio(validacionCampoVacioContrasenia,contrasenia);
                validacionCaracteresExtraniosContrasenia=verificarQueElCampoNoContengaCaracteresExtranios(validacionCaracteresExtraniosContrasenia,contrasenia,caracteresProhibidosContrasenia,mensajeCaracteresExtraniosContrasenia);
                validacionLongitudContrasenia=verificarLongitud(validacionLongitudContrasenia,contrasenia,numeroDeCaracteresPermitidosContrasenia);


                let validacionCoincidenciaContrasenia=false;
                let campoConfirmarContraseniaPasoTodasLasValidaciones=false;
                let confirmarContrasenia=document.getElementById("confirmarContraseniaCrearUsuario");
                validacionCoincidenciaContrasenia=verificarQueLosCamposCoincidan(validacionCoincidenciaContrasenia,confirmarContrasenia,contrasenia);


                if(validacionCampoVacioNombre&&validacionCaracteresExtraniosNombre&&validacionLongitudNombre)
                {
                    const mensajeError = document.querySelector("#mensajeValidacionNombreDeUsuario");
                    mensajeError.textContent = "";
                    campoNombrePasoTodasLasValidaciones=true;
                }

                if(validacionCampoVacioContrasenia&&validacionCaracteresExtraniosContrasenia&&validacionLongitudContrasenia)
                {
                    const mensajeError = document.querySelector("#mensajeValidacionContrasenia");
                    mensajeError.textContent = "";
                    campoContraseniaPasoTodasLasValidaciones=true;
                }

                if(validacionCoincidenciaContrasenia)
                {
                    const mensajeError = document.querySelector("#mensajeValidacionConfirmarContrasenia");
                    mensajeError.textContent = "";
                    campoConfirmarContraseniaPasoTodasLasValidaciones=true;
                }

                if(!campoNombrePasoTodasLasValidaciones&&campoContraseniaPasoTodasLasValidaciones&&campoConfirmarContraseniaPasoTodasLasValidaciones)
                {
                    event.preventDefault();
                }
            }
        );

        function verificarQueElCampoNoEsteVacio(validacionCampoVacio,elementoInput)
        {
            // Elimina los espacios en blanco del valor del elemento input
            const elementoInputSinEspacios = elementoInput.value.trim();

            // Verifica si el campo nombre está vacío
            if (elementoInputSinEspacios === "")
            {
                // El campo nombre está vacío
                // Muestra un mensaje de error
                const mensajeError = document.querySelector("#mensajeValidacion"+elementoInput.name);
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
            /*console.log("Dentro de la funcion verificarQueLosCamposCoincidan");
            console.log("Valor contraseña "+valorElementoInputDos);
            console.log("Valor verificar contraseña "+valorElementoInputUno);*/
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