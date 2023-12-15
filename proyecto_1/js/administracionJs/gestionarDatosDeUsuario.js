document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        principal();
        function principal()
        {
            let elementosBorrar = document.getElementsByName("Borrar");
            for (const elemento of elementosBorrar)
            {
                elemento.addEventListener
                (
                    "click", () =>
                    {
                        var confirmacion = window.confirm("¿Seguro que quieres eliminar este registro?");
                        if (!confirmacion)
                        {
                            event.preventDefault();
                            //location.reload();
                        }
                    }
                );
            }
        }
    }
);
