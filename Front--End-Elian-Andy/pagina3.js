document.addEventListener("DOMContentLoaded", function () {
    const buttonRegister = document.getElementById("buttonRegister");

    buttonRegister.addEventListener("click", function (event) {
        event.preventDefault();  

        const usuario = document.getElementById("RegistroUsuario").value;
        const nombre = document.getElementById("NombreRegistro").value;
        const apellido = document.getElementById("ApellidoRegistro").value;
        const pregunta = document.getElementById("PreguntaRegistro").value;
        const contraseña = document.getElementById("RegistroContraseña").value;

        if (!usuario || !contraseña || !pregunta || !nombre || !apellido) {
            alert("Por favor, complete los campos");
            return;
        }

        const infoPersona = {
            usuario: usuario,
            nombre: nombre,
            apellido: apellido,
            pregunta: pregunta,
            contraseña: contraseña
        };

        fetch("http://localhost:3000/auth/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona)
        })
        .then(response => {
            if (!response.ok) {  
                throw new Error("Usuario ya existente o algun error"); 
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data);
            alert("Registro exitoso");
            window.location.href = "./pagina2.html";
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
    });
});
