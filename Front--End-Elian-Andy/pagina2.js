document.addEventListener("DOMContentLoaded", function () {
    const buttonLogin = document.getElementById("buttonLogin");

    // Eliminar el paréntesis extra después de function(event)
    buttonLogin.addEventListener("click", function (event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        // Cambiar ariaValueMax a value para obtener el valor del campo
        const usuario = document.getElementById("UsuarioInicio").value;
        const contraseña = document.getElementById("ContraseñaInicio").value;

        if (!usuario || !contraseña) {
            alert("Por favor, complete los campos");
            return;
        }

        const infoPersona = {
            usuario: usuario,
            contraseña: contraseña
        };

        fetch("http://localhost:3000/auth/iniciodesesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona)
        })

            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Inicio de Sesion exitoso");
                window.location.href = "./pagina4.html"
            })
            .catch(error => console.error('Error:', error));
    });
});
