document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        const iniciarSesion = document.querySelector("#iniciarSesion");
        
        iniciarSesion.addEventListener
        (
            "click",
            function()
            {
                let validacionCampoVacioNombre=false;
                let campoNombrePasoTodasLasValidaciones=false;
                const nombreDeUsuario=document.querySelector("#nombreDeUsuario");
                validacionCampoVacioNombre=verificarQueElCampoNoEsteVacio(validacionCampoVacioNombre,nombreDeUsuario);

                let validacionCampoVacioContrasenia=false;
                let campoContraseniaPasoTodasLasValidaciones=false;
                const contrasenia=document.querySelector("#contrasenia");
                validacionCampoVacioContrasenia=verificarQueElCampoNoEsteVacio(validacionCampoVacioContrasenia,contrasenia);

                if(validacionCampoVacioNombre)
                {
                    const mensajeErrorNombre = document.querySelector("#mensajeValidacionNombreDeUsuario");
                    mensajeErrorNombre.textContent = "";
                    campoNombrePasoTodasLasValidaciones=true;
                }

                if(validacionCampoVacioContrasenia)
                {
                    const mensajeErrorContrasenia = document.querySelector("#mensajeValidacionNombreDeUsuario");
                    mensajeErrorContrasenia.textContent = "";
                    campoContraseniaPasoTodasLasValidaciones=true;
                }

                if(!campoNombrePasoTodasLasValidaciones&&campoContraseniaPasoTodasLasValidaciones)
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
    }
);