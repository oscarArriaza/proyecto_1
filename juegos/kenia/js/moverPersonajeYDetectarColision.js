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
        let matu=document.getElementById("matu");
        let morani=document.getElementById("morani");
        let kiano=document.getElementById("kiano");
        let direccionActual="inicial";
        let elementos_obstaculo = document.querySelectorAll("#obstaculo");
        let seDetectoColisionConObstaculo=false;
        let seDetectoColisionConMatu=false;
        let seDetectoColisionConMorani=false;
        let seDetectoColisionConKiano=false;
        let laiaBloqueada=false;
        let graficosUsados=[];
        let numeroDeGraficoAleatorio = generarNumeroAleatorio(0,8);
        let cronometro = document.getElementById("cronometro");
        let tiempo = 0;
        let minutos = 0;
        let puntaje = 300;
        graficosUsados.push(numeroDeGraficoAleatorio);

        let enunciados=[];
        enunciados[0]="Identifica el mes de mayor produccion sumale 25 y luego dividelo entre 2.";
        enunciados[1]="Sumale 20 al valor del mes de agosto luego dividelo entre 4.";
        enunciados[2]="Identifica el mes de menor produccion sumale 25 y luego dividelo entre 5.";
        enunciados[3]="¿Cual es el promedio de produccion entre los meses de enero a febrero?.";
        enunciados[4]="¿Cual es el promedio de produccion entre los meses de junio a julio?.";
        enunciados[5]="¿Cual es el promedio de produccion entre los meses de enero a junio?.";
        enunciados[6]="¿Cual seria la produccion del mes de agosto si se multiplica por 6.";
        enunciados[7]="¿Cuanto tendria que aumentar la produccion en el mes de julio para ser el mes de mayor produccion?";
        enunciados[8]="Identifica el mes de menos produccion energetica y multiplica el número de produccion por 2";
        let respuestasCorrectas=[62,17,6,40,42,37,72,54,24];
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
                const VELOCIDAD=8;

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
            if(numeroDeVentanaDeDialogo===2)
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
            if(!seDetectoColisionConMatu)
            {
                seDetectoColisionConMatu=detectarColisionConPersonaje(laia,matu);
                if(seDetectoColisionConMatu)
                {
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
                }
            }
            if(!seDetectoColisionConMorani)
            {
                seDetectoColisionConMorani=detectarColisionConPersonaje(laia,morani);
                if(seDetectoColisionConMorani)
                {
                    cambiarVentana3();
                    laiaBloqueada=true;
                    dialogo3.showModal();
                }
            }
            if(!seDetectoColisionConKiano)
            {
                seDetectoColisionConKiano=detectarColisionConPersonaje(laia,kiano);
                if(seDetectoColisionConKiano)
                {
                    cambiarVentana3();
                    laiaBloqueada=true;
                    dialogo3.showModal();
                }
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
            let mensajeError = document.getElementById("mensajeValidacionRespuesta");
            let radioButtons = document.getElementsByClassName("radio");
            validacioRadioButton=verificarRadioButton(validacioRadioButton,radioButtons);

            if(validacioRadioButton)
            {
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
                        parrafoDeDialogoEntreLosPersonajes2.textContent="¡Lo lograste! los aerogeneradores han vuelto a funcionar, ve al suroeste";
                        retratoLaia2.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaia.png";
                        dialogo2.showModal();
                        setTimeout
                        (
                            () =>
                            {
                                mision.style.color="red";
                                mision.textContent="Mision: Ve hacia el suroeste.";
                                cerrarVentana(2);
                            },
                            4000
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
                        parrafoDeDialogoEntreLosPersonajes3.textContent="¡Lo lograste Laia! los aerogeneradores han vuelto a funcionar, solo falta uno, ve hacia el sureste.";
                        retratoLaia3.src="./media/imagenes/imagenesPersonajePrincipal/retratoLaiaIzquierda.png";
                        dialogo4.showModal();
                        setTimeout
                        (
                            () =>
                            {
                                mision.style.color="red";
                                mision.textContent="Mision: Ve hacia el sureste para arreglar el ultimo aerogenerador.";
                                cerrarVentana(4);
                            },
                            6000
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
                            7500
                        );
                    }
                    console.log(puntaje);
                }
                else
                {
                    numeroDeRespuestasIncorrectas++;
                    mensajeError.textContent = "Respuesta incorrecta.";
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