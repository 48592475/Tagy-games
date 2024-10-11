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
        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/auth/olvidastecontra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(infoPersona)
        })
        .then(response => {
            if (!response.ok) {  
                throw new Error("Error al actualizar la contraseña"); 
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data);
            alert("Actualización de contraseña exitosa");
            window.location.href = "./pagina2.html";
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
    });
});
