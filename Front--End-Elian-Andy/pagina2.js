document.addEventListener("DOMContentLoaded", function() {
    const buttonLogin = document.getElementById("buttonLogin");

    // Eliminar el paréntesis extra después de function(event)
    buttonLogin.addEventListener("click", function(event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        // Cambiar ariaValueMax a value para obtener el valor del campo
        const nombre = document.getElementById("UsuarioInicio").value;
        const password = document.getElementById("ContraseñaInicio").value;

        if (!nombre || !password) {
            alert("Por favor, complete los campos");
            return; 
        }
        
        const infoPersona = {
            nombre: nombre,     
            password: password  
        };

        fetch("//url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
});
