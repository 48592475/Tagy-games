document.addEventListener("DOMContentLoaded", function () {
    const buttonRegistro = document.getElementById("buttonRegistro");

    buttonRegistro.addEventListener("click", function (event) {
        event.preventDefault(); 

        const nombre = document.getElementById("NombreRegistro").value;
        const apellido = document.getElementById("ApellidoRegistro").value;
        const pregunta = document.getElementById("PreguntaRegistro").value;
        const usuario = document.getElementById("RegistroUsuario").value;
        const contraseña = document.getElementById("RegistroContraseña").value;

        if (!nombre || !apellido || !pregunta || !usuario || !contraseña) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const infoRegistro = {
            nombre: nombre,
            apellido: apellido,
            pregunta: pregunta,
            usuario: usuario,
            contraseña: contraseña
        };

        fetch("http://localhost:3000/auth/registro", {  
            method: "POST",  
            headers: {
                "Content-Type": "application/json"  
            },
            body: JSON.stringify(infoRegistro)  
        })
        .then(response => response.json())  
        .then(data => {
            if (data.success) {
                alert("Registro exitoso. Bienvenido, " + usuario + "!");
                window.location.href = "./PaginaDeInicio.html";  
            } else if (data.message === "El usuario ya existe") {
                alert("El nombre de usuario ya está en uso. Intente con otro.");
            } else {
                alert("Error en el registro: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error con el registro. Inténtelo más tarde.");
        });
    });
});
