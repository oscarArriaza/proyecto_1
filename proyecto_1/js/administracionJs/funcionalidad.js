document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        
        principal();
        function principal()
        {
            let elementosJugar=document.getElementsByClassName("jugar");
            for (const elemento of elementosJugar)
            {
                elemento.addEventListener
                (
                    "click", () =>
                    {
                        abrirModal();
                    }
                );
            }
        }
        function abrirModal()
        {
            var miModal = new bootstrap.Modal(document.getElementById('modalLogin'));
            miModal.show();
        }
    }
);