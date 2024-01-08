document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        let contenedorPrincipal=document.querySelector("#contenedorPrincipal");
        let fila00=[],fila01=[],fila02=[],fila03=[],fila04=[],fila05=[],fila06=[],fila07=[],fila08=[],fila09=[],fila10=[],fila11=[],fila12=[],fila13=[],fila14=[];
        let fila15=[],fila16=[],fila17=[],fila18=[],fila19=[],fila20=[],fila21=[],fila22=[],fila23=[],fila24=[],fila25=[],fila26=[],fila27=[],fila28=[],fila29=[];
        let mapa=
        [
            fila00=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            fila01=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila02=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila03=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila04=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila05=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila06=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1],
            fila07=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1],
            fila08=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1],
            fila09=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1],
            fila10=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,1],
            fila11=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila12=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila13=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila14=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila15=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila16=[1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila17=[1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila18=[1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila19=[1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila20=[1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila21=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila22=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila23=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila24=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila25=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            fila26=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila27=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila28=[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            fila29=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],   
        ];

        mapa.forEach
        (
            element =>
            {
                for (let i = 0; i < element.length; i++)
                {
                    let rutaDeimagen="";
                    if(element[i]===0)
                    {
                        rutaDeimagen="./media/imagenes/entorno/sueloArido.jpg"
                        idDelaImagen="suelo";
                    }
                    else if(element[i]===1)
                    {
                        rutaDeimagen="./media/imagenes/entorno/sueloSelvatico.jpg"
                        idDelaImagen="obstaculo";
                    }
                    else if(element[i]===2)
                    {
                        rutaDeimagen="./media/imagenes/entorno/sabanaAfricana.png"
                        idDelaImagen="obstaculo";
                    }
                    let bloqueDeEntorno = document.createElement("img");
                    bloqueDeEntorno.src = rutaDeimagen;
                    bloqueDeEntorno.id=idDelaImagen;
                    contenedorPrincipal.appendChild(bloqueDeEntorno);
                }
            }
        );

        let malik=document.createElement("img");
        malik.src="./media/imagenes/imagenesPersonajesSecundarios/malikPokot/malikPokotIzquierda.png";
        malik.id="malik";
        malik.className="personaje";
        contenedorPrincipal.appendChild(malik);

        let matu=document.createElement("img");
        matu.src="./media/imagenes/imagenesPersonajesSecundarios/aldeano/aldeanoIzquierda.png";
        matu.id="matu";
        matu.className="personaje";
        contenedorPrincipal.appendChild(matu);

        let morani=document.createElement("img");
        morani.src="./media/imagenes/imagenesPersonajesSecundarios/aldeano/aldeanoDerecha.png";
        morani.id="morani";
        morani.className="personaje";
        contenedorPrincipal.appendChild(morani);

        let kiano=document.createElement("img");
        kiano.src="./media/imagenes/imagenesPersonajesSecundarios/aldeano/aldeanoIzquierda.png";
        kiano.id="kiano";
        kiano.className="personaje";
        contenedorPrincipal.appendChild(kiano);
        
        for (let i = 0; i < 2; i++)
        {
            let aldeanoViendoHaciaLaDerecha=document.createElement("img");
            aldeanoViendoHaciaLaDerecha.src="./media/imagenes/imagenesPersonajesSecundarios/aldeano/aldeanoDerecha.png";
            aldeanoViendoHaciaLaDerecha.className="personaje";
            if(i===0)
            {
                aldeanoViendoHaciaLaDerecha.style="top: 150px; left:350px;";
            }
            else
            {
                aldeanoViendoHaciaLaDerecha.style="top: 350px; left:950px;";
            }
            contenedorPrincipal.appendChild(aldeanoViendoHaciaLaDerecha);
        }

        let aldeanoViendoHaciaLaIzquierda=document.createElement("img");
        aldeanoViendoHaciaLaIzquierda.src="./media/imagenes/imagenesPersonajesSecundarios/aldeano/aldeanoIzquierda.png";
        aldeanoViendoHaciaLaIzquierda.className="personaje";
        aldeanoViendoHaciaLaIzquierda.style="top: 530px; left:260px;";
        contenedorPrincipal.appendChild(aldeanoViendoHaciaLaIzquierda);

        let laia=document.createElement("img");
        laia.src="./media/imagenes/imagenesPersonajePrincipal/laiaDerecha.gif";
        laia.id="laia";
        laia.className="personaje";
        contenedorPrincipal.appendChild(laia);

        let arbol=document.createElement("img");
        arbol.src="./media/imagenes/entorno/arbolDeLaSabanaAfricana.png";
        arbol.className="arbol";
        arbol.style="top: 490px; left: 55px;";
        contenedorPrincipal.appendChild(arbol);

        let choza=document.createElement("img");
        choza.src="./media/imagenes/entorno/chozaPrimitiva.png";
        choza.className="choza";
        choza.style="top: 135px; left: 570px";
        contenedorPrincipal.appendChild(choza);

        for (let i = 0; i <2; i++)
        {
            let arbol=document.createElement("img");
            arbol.src="./media/imagenes/entorno/arbolDeLaSabanaAfricana.png";
            arbol.className="arbol";
            if(i===0)
            {
                arbol.style="top: 100px; left: 485px;";
            }
            else
            {
                arbol.style="top: 330px; left: 1100px;";
            }
            contenedorPrincipal.appendChild(arbol);
        }

        for (let i = 0; i<4; i++)
        {
            let choza=document.createElement("img");
            choza.src="./media/imagenes/entorno/chozaPrimitiva.png";
            choza.className="choza";
            if(i===0)
            {
                choza.style="top: 330px; left: 1000px;";
            }
            else if(i===1)
            {
                choza.style="top: 150px; left: 400px;";
            }
            else if(i===2)
            {
                choza.style="top: 530px; left: 200px;";
            }
            else if(i===3)
            {
                choza.style="top: 184px; left: 472px";
            }
            contenedorPrincipal.appendChild(choza);
        }

        for (let i = 0; i <6; i++)
        {
            let aerogenerador=document.createElement("img");
            aerogenerador.src="./media/imagenes/entorno/aerogeneradorDetenido.png";
            aerogenerador.id="aerogenerador"+i;
            aerogenerador.className="aerogenerador";
            if(i===0)
            {
                aerogenerador.style="top: 70px; left: 850px;";
            }
            else if(i===1)
            {
                aerogenerador.style="top: 105px; left: 950px;";
            }
            else if(i===2)
            {
                aerogenerador.style="top: 70px; left: 1050px;";
            }
            else if(i===3)
            {
                aerogenerador.style="top: 270px; left: 175px;";
            }
            else if(i===4)
            {
                aerogenerador.style="top: 305px; left: 275px;";
            }
            else if(i===5)
            {
                aerogenerador.style="top: 270px; left: 375px;";
            }
            contenedorPrincipal.appendChild(aerogenerador);
        }
    }
);