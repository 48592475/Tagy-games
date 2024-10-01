document.addEventListener("DOMContentLoaded", function () {
    const buttonLogin = document.getElementById("buttonLogin");

    buttonLogin.addEventListener("click", function (event) {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario

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
        .then(response => {
            if (!response.ok) {  // Si el servidor responde con un código de error
                throw new Error("Usuario o contraseña incorrectos");  // Lanzar un error
            }
            const token=response.data.token
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Inicio de sesión exitoso");
            window.location.href = "./pagina4.html";
        })
        .catch(error => {
            alert(error.message);  // Mostrar el mensaje de error en caso de fallo
            console.error('Error:', error);
        });
    });
});
