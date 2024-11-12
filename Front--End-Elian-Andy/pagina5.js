document.addEventListener("DOMContentLoaded", function () {
    const buttonLost = document.getElementById("buttonLost");

    buttonLost.addEventListener("click", function (event) {
        event.preventDefault(); 

        const usuario = document.getElementById("UsuarioOlvido").value;
        const pregunta = document.getElementById("PreguntaOlvido").value;
        const contraseña = document.getElementById("ContraseñaOlvido").value;

        if (!usuario || !contraseña || !pregunta) {
            alert("Por favor, complete los campos");
            return;
        }

        const infoPersona = {
            usuario: usuario,
            pregunta: pregunta,
            contraseña: contraseña
        };

        fetch("http://localhost:3000/auth/olvidastecontra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoPersona)
        })
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {  
                throw new Error("Error al actualizar la contraseña. Porfavor verifique que sus credenciales conincidan"); 
            }
            return response.json(); 
        })
        .then(data => {
            console.log('Data:', data);
            alert("Actualización de contraseña exitosa");
            window.location.href = "./pagina2.html";
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
    });
});
