document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        let posicionX=0;
        let posicionY=0;
        let posicionXAnterior=0;
        let posicionYAnterior=0;
        let laia=document.getElementById("laia");
        let malik=document.getElementById("malik");
        let matu=document.getElementById("matu");
        let morani=document.getElementById("morani");
        let kiano=document.getElementById("kiano");
        let direccionActual="inicial";
        let elementos_obstaculo = document.querySelectorAll("#obstaculo");
        let seDetectoColisionConObstaculo=false;
        let seDetectoColisionConMalik=false;
        let seDetectoColisionConMatu=false;
        let seDetectoColisionConMorani=false;
        let seDetectoColisionConKiano=false;
        let laiaBloqueada=false;
        let numeroDeLineaDeDialogo=2;
        let numeroDeLineaDeDialogo2=2;
        let numeroDeLineaDeDialogo3=2;
        let numeroDeLineaDeDialogo4=2;
        let graficosUsados=[];
        let numeroDeGraficoAleatorio = generarNumeroAleatorio(0,8);
        let cronometro = document.getElementById("cronometro");
        let tiempo = 0;
        let minutos = 0;
        let puntaje = 300;
        graficosUsados.push(numeroDeGraficoAleatorio);

        let enunciados=[];
        enunciados[0]="Identifica el mes de mayor produccion sumale 25 y luego dividelo entre 4.";
        enunciados[1]="Sumale 20 al valor del mes de agosto luego dividelo entre 17.";
        enunciados[2]="Identifica el mes de menor produccion sumale 43 y luego dividelo entre 6.";
        enunciados[3]="¿Cual es el promedio de produccion entre los meses de enero a febrero?.";
        enunciados[4]="¿Cual es el promedio de produccion entre los meses de enero a abril?.";
        enunciados[5]="¿Cual es el promedio de produccion entre los meses de enero a junio?.";
        enunciados[6]="¿Cual seria la produccion del mes de agosto si se multiplica por 6.";
        enunciados[7]="¿Cuanto tendria que aumentar la produccion en el mes de abril para ser el mes de mayor produccion?";
        enunciados[8]="Identifica el mes de menos produccion energetica y multiplica el número de produccion por 2, como factor de seguridad...";
        let respuestasCorrectas=[31,4,8,40,62,37,72,71,24];
        //console.log(respuestasCorrectas[numeroDeGraficoAleatorio]);
        let mision=document.getElementById("mision");
        let indiceDeRadioButtonSeleccionado;
        let numeroDeRespuestasIncorrectas=0;
        let seGeneraronTodosLosGraficos=false;
        let elGraficoYaFueUsado;
        let cadenaGraficosUsados="";
        document.addEventListener("keydown",moverPersonaje);

        //let cerrar=document.getElementById("cerrar");
        //cerrar.addEventListener("click",cerrarVentana)

        let enviarRespuesta=document.getElementById("enviarRespuesta");
        enviarRespuesta.addEventListener("click",validacion);

        function moverPersonaje(event)
        {
            if(!laiaBloqueada)
            {
                const VELOCIDAD=20;

                switch(event.key)
                {
                    case "ArrowUp":
                        VARIABLE_PROXY.value="Arriba";
                        posicionY-=VELOCIDAD;
                        estaFuncionSiEslaQueMueveAlPersonaje();
                        break;
                    case "ArrowDown":
                        VARIABLE_PROXY.value="Abajo";
                        posicionY+=VELOCIDAD;
                        estaFuncionSiEslaQueMueveAlPersonaje();
                        break;
                    case "ArrowLeft":
                        VARIABLE_PROXY.value="Izquierda";
                        posicionX-=VELOCIDAD;
                        estaFuncionSiEslaQueMueveAlPersonaje();
                        break;
                    case "ArrowRight":
                        VARIABLE_PROXY.value="Derecha";
                        posicionX+=VELOCIDAD;
                        estaFuncionSiEslaQueMueveAlPersonaje();
                        break;
                    default:
                        return;
                }
                posicionXAnterior=posicionX;
                posicionYAnterior=posicionY;
            }
        }

        // Función que cambia la imagen cuando la variable direccionActual cambie
        function handleVariableChange(newValue)
        {
            laia.src = `./media/imagenes/imagenesPersonajePrincipal/laia${newValue}.gif`;
        }
        // Crear un objeto Proxy para observar cambios en la variable
        const VARIABLE_PROXY = new Proxy
        (
            { 
                value: direccionActual
            },
            {
                set: function (target, property, value)
                {
                    if (target[property] !== value)
                    {
                        target[property] = value;
                        handleVariableChange(value);
                    }
                    return true;
                }
            }
        );
        function detectarColisionConObstaculo(objeto1, objetos2)
        {
            const rect1 = objeto1.getBoundingClientRect();
        
            for (const objeto2 of objetos2)
            {
                const rect2 = objeto2.getBoundingClientRect();
        
        
                if (!(rect1.right < rect2.left ||
                      rect1.left > rect2.right ||
                      rect1.bottom < rect2.top ||
                      rect1.top > rect2.bottom)
                    )
                    {
                        return true;  // Colisión detectada con al menos un objeto2
                    }
            }
        
            return false;  // No hay colisiones
        }
        function detectarColisionConPersonaje(objeto1, objeto2)
        {
            const rect1 = objeto1.getBoundingClientRect();
            const rect2 = objeto2.getBoundingClientRect();
            if (!(rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom)
                )
                {
                    return true;  // Colisión detectada con al menos un objeto2
                }
            return false;  // No hay colisiones
        }
        function cerrarVentana(numeroDeVentanaDeDialogo)
        {
            if(numeroDeVentanaDeDialogo===1)
            {
                dialogo.close();
            }
            else if(numeroDeVentanaDeDialogo===2)
            {
                dialogo2.close();
            }
            else if(numeroDeVentanaDeDialogo===3)
            {
                dialogo3.close();
            }
            else if(numeroDeVentanaDeDialogo===4)
            {
                dialogo4.close();
            }
            else if(numeroDeVentanaDeDialogo===5)
            {
                dialogo5.close();
            }
            laiaBloqueada=false;
        }
        function estaFuncionSiEslaQueMueveAlPersonaje()
        {
            laia.style.transform = `translate(${posicionX}px, ${posicionY}px)`;
            seDetectoColisionConObstaculo=detectarColisionConObstaculo(laia,elementos_obstaculo);
            if(seDetectoColisionConObstaculo)
            {
                //posicionXAnterior=545;
                //posicionYAnterior=195;
                posicionX=posicionXAnterior;
                posicionY=posicionYAnterior;
                laia.style.transform = `translate(${posicionXAnterior}px, ${posicionYAnterior}px)`;
            }
            /*if(!seDetectoColisionConMalik)
            {
                seDetectoColisionConMalik=detectarColisionConPersonaje(laia,malik);
                if(seDetectoColisionConMalik)
                {
                    laiaBloqueada=true;
                    dialogo.showModal();
                    setTimeout
                    (
                        () =>
                        {
                            conversacionConMalik("laia","Hola Malik me llamo Laia Ferrer, soy ingeniera industrial y he venido desde España para ayudar a las comunidades que no tienen electricidad.");
                        },
                        6300
                    );
                }
            }*/
            if(!seDetectoColisionConMatu)
            {
                seDetectoColisionConMatu=detectarColisionConPersonaje(laia,matu);
                if(seDetectoColisionConMatu)
                {
                    mision.textContent="";
                    laiaBloqueada=true;
                    dialogo2.showModal();
                    setTimeout
                    (
                        () =>
                        {
                            conversacionConMatu("laia","Tu debes ser Matu yo me llamo Laia Ferrer, Malik me dijo que quizas pueda ayudarlos a configurar los aerogeneradores.");
                        },
                        2000
                    );
                }
            }
            if(!seDetectoColisionConMorani)
            {
                seDetectoColisionConMorani=detectarColisionConPersonaje(laia,morani);
                if(seDetectoColisionConMorani)
                {
                    mision.textContent="";
                    laiaBloqueada=true;
                    dialogo4.showModal();
                    setTimeout
                    (
                        () =>
                        {
                            conversacionConMorani("laia","Gracias por preparar todo, a ver el panel.");
                        },
                        8000
                    );
                }
            }
            if(!seDetectoColisionConKiano)
            {
                seDetectoColisionConKiano=detectarColisionConPersonaje(laia,kiano);
                if(seDetectoColisionConKiano)
                {
                    mision.textContent="";
                    laiaBloqueada=true;
                    dialogo5.showModal();
                    setTimeout
                    (
                        ()=>
                        {
                            conversacionConKiano("laia","Gracias por preparar todo, a ver el panel.");
                        },
                        5000
                    );
                }
            }
        }
        function conversacionConMalik(emisor,parrafo)
        {
            numeroDeLineaDeDialogo++;
            let retratoLaia=document.getElementById("retratoDeLaia");
            let retratoMalik=document.getElementById("retratoDeMalik");
            let parrafoDeDialogoEntreLosPersonajes=document.getElementById("parrafoDeDialogoEntreLosPersonajes");
            if(emisor==="laia")
            {
                retratoMalik.src="./media/imagenes/imagenesPersonajesSecundarios/malikPokot/retratoMalik.png";
                parrafoDeDialogoEntreLosPersonajes.textContent=parrafo;
                retratoLaia.src="./media/imagenes/imagenesPersonajePrincipal/laiaHablando.gif";
            }
            else if(emisor==="malik")
            {
                retratoMalik.src="./media/imagenes/imagenesPersonajesSecundarios/malikPokot/malikHablando.gif";
                parrafoDeDialogoEntreLosPersonajes.textContent=parrafo;
                retratoLaia.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png";
            }
            if(numeroDeLineaDeDialogo===3)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMalik("malik","¿Desde España? es increible que hayan personas tan solidarias en el mundo.");
                    },
                    6000
                );
            }
            else if(numeroDeLineaDeDialogo===4)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMalik("laia","Asi es soy muy solidaria, ya he ayudado a un pequeño pueblo en Brasil llamado Tatuyo.");
                    },
                    4000
                );
            }
            else if(numeroDeLineaDeDialogo===5)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMalik("malik","Por favor Laia ayudanos a nosotros tambien, mencionaste que eres ingeniera industrial, veras, teniamos unos aerogeneradores que generaban energia para toda esta región pero una tormenta electrica los a desconfigurado, puede que tu puedas configurarlos otra vez.");
                    },
                    6000
                );
            }
            else if(numeroDeLineaDeDialogo===6)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMalik("laia","Vere que puedo hacer, ¿Donde estan esos aerogeneradores?");
                    },
                    16000
                );
            }
            else if(numeroDeLineaDeDialogo===7)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMalik("malik","Estan al este de acá, sigue el camino a mis espaldas y llegaras hasta ellos, cuando estes allá habla con Matu, el te explicara la situacion.");
                    },
                    4000
                );
            }
            else if(numeroDeLineaDeDialogo===8)
            {
                setTimeout
                (
                    () =>
                    {
                        mision.style.color="red";
                        mision.textContent="Mision: Ve hacia el este y habla con Matu.";
                        cerrarVentana(1);
                    },
                    9000
                );
            }
        }
        function conversacionConMatu(emisor,parrafo)
        {
            numeroDeLineaDeDialogo2++;
            let retratoLaia2=document.getElementById("retratoDeLaia2");
            let retratoMatu=document.getElementById("retratoDeMatu");
            let parrafoDeDialogoEntreLosPersonajes2=document.getElementById("parrafoDeDialogoEntreLosPersonajes2");
            if(emisor==="laia")
            {
                retratoMatu.src="./media/imagenes/imagenesPersonajesSecundarios/matu/retratoMatu.png";
                parrafoDeDialogoEntreLosPersonajes2.textContent=parrafo;
                retratoLaia2.src="./media/imagenes/imagenesPersonajePrincipal/laiaHablando.gif";
            }
            else if(emisor==="matu")
            {
                retratoMatu.src="./media/imagenes/imagenesPersonajesSecundarios/matu/matuHablando.gif";
                parrafoDeDialogoEntreLosPersonajes2.textContent=parrafo;
                retratoLaia2.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png";
            }
            if(numeroDeLineaDeDialogo2===3)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMatu("matu","¿En serio? que alegria, bueno por lo que pude leer en el panel de control, al parecer falta asignar el factor de seguridad.");
                    },
                    8000
                );
            }
            else if(numeroDeLineaDeDialogo2===4)
            {
                setTimeout
                (
                    () =>
                    {
                        conversacionConMatu("laia","A ver el panel de control.");
                    },
                    8000
                );
            }
            else if(numeroDeLineaDeDialogo2===5)
            {
                setTimeout
                (
                    () =>
                    {
                        cerrarVentana(2);
                        let enunciado=document.getElementById("enunciado");
                        enunciado.textContent=enunciados[numeroDeGraficoAleatorio];
                        let grafico=document.getElementById("grafico");
                        grafico.src="./media/imagenes/graficos/produccionDeElectricidad"+numeroDeGraficoAleatorio+".jpg";
                        let posicionDeLaRespuestaCorrecta;
                        posicionDeLaRespuestaCorrecta=generarNumeroAleatorio(0,4);
                        let radioButtonCorrecto=document.getElementById("radio"+posicionDeLaRespuestaCorrecta);
                        radioButtonCorrecto.value=respuestasCorrectas[numeroDeGraficoAleatorio];
                        let labelRadioCorrecto=document.getElementById("labelRadio"+posicionDeLaRespuestaCorrecta);
                        labelRadioCorrecto.textContent=respuestasCorrectas[numeroDeGraficoAleatorio];
                        let radioButton;
                        let labelRadio;
                        for (let i = 0; i < 5; i++)
                        {
                            if(i!==posicionDeLaRespuestaCorrecta)
                            {
                                numero=generarNumeroAleatorio(4,72);
                                radioButton=document.getElementById("radio"+i);
                                radioButton.value=numero;
                                labelRadio=document.getElementById("labelRadio"+i);
                                labelRadio.textContent=numero;
                            }
                        }
                        laiaBloqueada=true;
                        setInterval(iniciarCronometro, 1000);
                        dialogo3.showModal();
                    },
                    2000
                );
            }
        }
        function conversacionConMorani(emisor,parrafo)
        {
            numeroDeLineaDeDialogo3++;
            let retratoLaia3=document.getElementById("retratoDeLaia3");
            let retratoMorani=document.getElementById("retratoDeMorani");
            let parrafoDeDialogoEntreLosPersonajes3=document.getElementById("parrafoDeDialogoEntreLosPersonajes3");
            if(emisor==="laia")
            {
                retratoMorani.src="./media/imagenes/imagenesPersonajesSecundarios/morani/retratoMorani.png";
                parrafoDeDialogoEntreLosPersonajes3.textContent=parrafo;
                retratoLaia3.src="./media/imagenes/imagenesPersonajePrincipal/laiaHablandoIzquierda.gif";
            }
            else if(emisor==="morani")
            {
                retratoMorani.src="./media/imagenes/imagenesPersonajesSecundarios/morani/moraniHablando.gif";
                parrafoDeDialogoEntreLosPersonajes3.textContent=parrafo;
                retratoLaia3.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaiaIzquierda.png";
            }
            if(numeroDeLineaDeDialogo3===3)
            {
                setTimeout
                (
                    () =>
                    {
                        cerrarVentana(4);
                        cambiarVentana3();
                        laiaBloqueada=true;
                        dialogo3.showModal();
                    },
                    5000
                );
            }
        }
        function conversacionConKiano(emisor,parrafo)
        {
            numeroDeLineaDeDialogo4++;
            let retratoLaia4=document.getElementById("retratoDeLaia4");
            let retratoKiano=document.getElementById("retratoDeKiano");
            let parrafoDeDialogoEntreLosPersonajes4=document.getElementById("parrafoDeDialogoEntreLosPersonajes4");
            if(emisor==="laia")
            {
                retratoKiano.src="./media/imagenes/imagenesPersonajesSecundarios/kiano/retratoKiano.png";
                parrafoDeDialogoEntreLosPersonajes4.textContent=parrafo;
                retratoLaia4.src="./media/imagenes/imagenesPersonajePrincipal/laiaHablando.gif";
            }
            else if(emisor==="kiano")
            {
                retratoKiano.src="./media/imagenes/imagenesPersonajesSecundarios/kiano/kianoHablando.gif";
                parrafoDeDialogoEntreLosPersonajes4.textContent=parrafo;
                retratoLaia4.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png";
            }
            if(numeroDeLineaDeDialogo4===3)
            {
                setTimeout
                (
                    () =>
                    {
                        cerrarVentana(5);
                        cambiarVentana3();
                        laiaBloqueada=true;
                        dialogo3.showModal();
                    },
                    3000
                );
            }
        }
        function generarNumeroAleatorio(MIN,MAX)
        {
            let numeroAlAzar = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
            return numeroAlAzar;
        }
        function validacion()
        {
            let validacioRadioButton=false;
            let campoRespuestaPasoLaValidacion=false;
            let radioButtons = document.getElementsByClassName("radio");
            validacioRadioButton=verificarRadioButton(validacioRadioButton,radioButtons);

            if(validacioRadioButton)
            {
                let mensajeError = document.getElementById("mensajeValidacionRespuesta");
                mensajeError.textContent = "";
                campoRespuestaPasoLaValidacion=true;
            }

            if(campoRespuestaPasoLaValidacion)
            {
                let valorRadioButtonSeleccionado;
                valorRadioButtonSeleccionado=radioButtons[indiceDeRadioButtonSeleccionado].value;
                valorRadioButtonSeleccionado=Number(valorRadioButtonSeleccionado);
                if(valorRadioButtonSeleccionado===respuestasCorrectas[numeroDeGraficoAleatorio])
                {
                    //console.log("Respuesta correcta");
                    restarPuntosPorTiempoTranscurrido();
                    cerrarVentana(3);
                    radioButtons[indiceDeRadioButtonSeleccionado].checked=false;
                    laiaBloqueada=true;
                    if(graficosUsados.length===1)
                    {
                        let aerogenerador0=document.getElementById("aerogenerador0");
                        aerogenerador0.src="./media/imagenes/entorno/aerogenerador.gif";

                        cambiarVentana3();
                        dialogo3.showModal();
                    }
                    else if(graficosUsados.length===2)
                    {
                        let aerogenerador1=document.getElementById("aerogenerador1");
                        aerogenerador1.src="./media/imagenes/entorno/aerogenerador.gif";

                        cambiarVentana3();
                        dialogo3.showModal();
                    }
                    else if(graficosUsados.length===3)
                    {
                        let aerogenerador2=document.getElementById("aerogenerador2");
                        aerogenerador2.src="./media/imagenes/entorno/aerogenerador.gif";

                        let retratoLaia2=document.getElementById("retratoDeLaia2");
                        let retratoMatu=document.getElementById("retratoDeMatu");
                        retratoMatu.src="./media/imagenes/imagenesPersonajesSecundarios/matu/matuHablando.gif";
                        parrafoDeDialogoEntreLosPersonajes2.textContent="¡Lo lograste! los aerogeneradores han vuelto a funcionar, sin embargo aun quedan otros dos grupos de aerogeneradores por configurar, ve al suroeste y habla con Morani";
                        retratoLaia2.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png";
                        dialogo2.showModal();
                        setTimeout
                        (
                            () =>
                            {
                                mision.style.color="red";
                                mision.textContent="Mision: Ve hacia el suroeste y habla con Morani.";
                                cerrarVentana(2);
                            },
                            10000
                        );
                    }
                    else if(graficosUsados.length===4)
                    {
                        let aerogenerador3=document.getElementById("aerogenerador3");
                        aerogenerador3.src="./media/imagenes/entorno/aerogenerador.gif";

                        cambiarVentana3();
                        dialogo3.showModal();
                    }
                    else if(graficosUsados.length===5)
                    {
                        let aerogenerador4=document.getElementById("aerogenerador4");
                        aerogenerador4.src="./media/imagenes/entorno/aerogenerador.gif";

                        let retratoLaia3=document.getElementById("retratoDeLaia3");
                        let retratoMorani=document.getElementById("retratoDeMorani");
                        retratoMorani.src="./media/imagenes/imagenesPersonajesSecundarios/morani/moraniHablando.gif";
                        parrafoDeDialogoEntreLosPersonajes3.textContent="¡Lo lograste Laia! los aerogeneradores han vuelto a funcionar, solo falta uno, ve hacia el sureste y habla con Kiano el te estara esperando.";
                        retratoLaia3.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaiaIzquierda.png";
                        dialogo4.showModal();
                        setTimeout
                        (
                            () =>
                            {
                                mision.style.color="red";
                                mision.textContent="Mision: Ve hacia el sureste y habla con Kiano para arreglar el ultimo aerogenerador.";
                                cerrarVentana(4);
                            },
                            10000
                        );
                    }
                    else if(graficosUsados.length===6)
                    {
                        let aerogenerador5=document.getElementById("aerogenerador5");
                        aerogenerador5.src="./media/imagenes/entorno/aerogenerador.gif";

                        let retratoLaia4=document.getElementById("retratoDeLaia4");
                        let retratoKiano=document.getElementById("retratoDeKiano");
                        retratoKiano.src="./media/imagenes/imagenesPersonajesSecundarios/kiano/kianoHablando.gif";
                        parrafoDeDialogoEntreLosPersonajes4.textContent="¡Lo lograste Laia! todos los aerogeneradores han vuelto a funcionar, toda la region cuenta con electricidad de nuevo, gracias a vos.";
                        retratoLaia4.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png";
                        dialogo5.showModal();
                        setTimeout
                        (
                            ()=>
                            {
                                cerrarVentana(5);
                                laiaBloqueada=true;
                                restarPuntosPorRespuestasIncorrectas();
                                let h1Puntaje=document.getElementById("h1Puntaje");
                                let imputTextPuntuacion=document.getElementById("puntuacion");
                                imputTextPuntuacion.value=puntaje;
                                h1Puntaje.textContent="Tu puntaje: "+puntaje;
                                dialogo6.showModal();
                            },
                            8000
                        );
                    }
                    console.log(puntaje);
                }
                else
                {
                    numeroDeRespuestasIncorrectas++;
                    //console.log(numeroDeRespuestasIncorrectas);
                }
            }
        }
        function verificarRadioButton(validacioRadioButton,radioButtons)
        {   
            // Verifica si algun radio button está marcado
            let hayUnRadioButtonMarcado=false;
            for (let i = 0; i < radioButtons.length; i++)
            {
                if(radioButtons[i].checked)
                {
                    indiceDeRadioButtonSeleccionado=i;
                    //console.log(indiceDeRadioButtonSeleccionado);
                    hayUnRadioButtonMarcado = true;
                    break;
                }
            }
            if (hayUnRadioButtonMarcado)
            {
                validacioRadioButton = true;
            }
            else
            {
                let mensajeError = document.getElementById("mensajeValidacionRespuesta");
                mensajeError.style.color = "red";
                mensajeError.textContent = "Debe seleccionar una respuesta.";
            }
            return validacioRadioButton;
        }
        function generarNumeroDeGraficoValido()
        {
            seGeneraronTodosLosGraficos=verificarQueYaSeGeneraronTodosLosGraficos(graficosUsados,seGeneraronTodosLosGraficos);
            if(!seGeneraronTodosLosGraficos)
            {
                numeroDeGraficoAleatorio=generarNumeroAleatorio(0,8);
                elGraficoYaFueUsado=verificarQueElNumeroNoFueUsado(graficosUsados,numeroDeGraficoAleatorio);
                if(elGraficoYaFueUsado)
                {
                    /*console.log(" ");
                    console.log(numeroDeGraficoAleatorio);
                    console.log("El grafico ya fue usado hay que generar otro");
                    console.log(" ");*/
                    generarNumeroDeGraficoValido();
                }
                else
                {
                    graficosUsados.push(numeroDeGraficoAleatorio);
                    cadenaGraficosUsados=graficosUsados.toString();
                    //console.log(cadenaGraficosUsados);
                }
            }
            else
            {
                //console.log("Se generaron todos los graficos");
            }
        }
        function verificarQueYaSeGeneraronTodosLosGraficos(graficosUsados,seGeneraronTodosLosGraficos)
        {
            if(graficosUsados.length===9)
            {
                seGeneraronTodosLosGraficos=true;
            }
            return seGeneraronTodosLosGraficos;
        }
        function verificarQueElNumeroNoFueUsado(graficosUsados,numeroDeGraficoAleatorio)
        {
            let elGraficoYaFueUsado=false;
            for (let i = 0; i < graficosUsados.length; i++)
            {
                /*console.log(graficoAleatorio);
                console.log(graficosUsados[i]);
                console.log(typeof(graficoAleatorio));
                console.log(typeof(graficosUsados[i]));*/
                if(numeroDeGraficoAleatorio===graficosUsados[i])
                {
                    elGraficoYaFueUsado=true;
                    break;
                }
            }
            return elGraficoYaFueUsado;
        }
        function iniciarCronometro()
        {
            tiempo++;
            if (tiempo % 60 == 0)
            {
                minutos++;
            }
            cronometro.textContent = "Tiempo transcurrido: " +`${minutos}:${tiempo % 60}`;
        }
        function reiniciarCronometro()
        {
            minutos = 0;
            tiempo = 0;
        }
        function restarPuntosPorTiempoTranscurrido()
        {
            if(minutos*60+(tiempo % 60)>35)
            {
                puntaje=puntaje-25;
            }
            else if(minutos*60+(tiempo % 60)>30)
            {
                puntaje=puntaje-20;
            }
            else if(minutos*60+(tiempo % 60)>25)
            {
                puntaje=puntaje-15;
            }
            else if(minutos*60+(tiempo % 60)>20)
            {
                puntaje=puntaje-10;
            }
            else if(minutos*60+(tiempo % 60)>15)
            {
                puntaje=puntaje-5;
            }
            else if(minutos*60+(tiempo % 60)>10)
            {
                puntaje=puntaje-0;
            }
        }
        function restarPuntosPorRespuestasIncorrectas()
        {
            puntaje=puntaje-(numeroDeRespuestasIncorrectas*5);
            console.log(" ");
            console.log(numeroDeRespuestasIncorrectas*5);
        }
        function cambiarVentana3()
        {
            generarNumeroDeGraficoValido();
            let enunciado=document.getElementById("enunciado");
            enunciado.textContent=enunciados[numeroDeGraficoAleatorio];
            let grafico=document.getElementById("grafico");
            grafico.src="./media/imagenes/graficos/produccionDeElectricidad"+numeroDeGraficoAleatorio+".jpg";
            let posicionDeLaRespuestaCorrecta;
            posicionDeLaRespuestaCorrecta=generarNumeroAleatorio(0,4);
            let radioButtonCorrecto=document.getElementById("radio"+posicionDeLaRespuestaCorrecta);
            radioButtonCorrecto.value=respuestasCorrectas[numeroDeGraficoAleatorio];
            let labelRadioCorrecto=document.getElementById("labelRadio"+posicionDeLaRespuestaCorrecta);
            labelRadioCorrecto.textContent=respuestasCorrectas[numeroDeGraficoAleatorio];
            let radioButton;
            let labelRadio;
            for (let i = 0; i < 5; i++)
            {
                if(i!==posicionDeLaRespuestaCorrecta)
                {
                    numero=generarNumeroAleatorio(4,72);
                    radioButton=document.getElementById("radio"+i);
                    radioButton.value=numero;
                    labelRadio=document.getElementById("labelRadio"+i);
                    labelRadio.textContent=numero;
                }
            }
            //laiaBloqueada=true;
            reiniciarCronometro();
        }
    }
);