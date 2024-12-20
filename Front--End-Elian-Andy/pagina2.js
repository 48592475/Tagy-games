document.addEventListener("DOMContentLoaded", function () {
    const buttonLogin = document.getElementById("buttonLogin");

    buttonLogin.addEventListener("click", function (event) {
        event.preventDefault(); 

        const usuario = document.getElementById("UsuarioInicio").value;
        const contraseña = document.getElementById("ContraseñaInicio").value;

        if (!usuario || !contraseña) {
            alert("Por favor, complete los campos");
            return;
        }

        const loginInfo = {
            usuario: usuario,
            contraseña: contraseña
        };

        fetch("http://localhost:3000/auth/iniciodesesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en el inicio de sesión, porfavor verifique sus credenciales"); 
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data);
            const { token } = data; 
            if (token) {
                localStorage.setItem("token", token);
                alert("Inicio de sesión exitoso");

                handleLoginSuccess(usuario);

                window.location.href = "./pagina4.html"; 
                
            } else {
                throw new Error("No se recibió token");
            }
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
    });
});
// Función para enviar el nombre de usuario a la IA
function handleLoginSuccess(usuario) {
    let USERNAME = usuario; // Asigna el usuario como el nombre de usuario

    // Log para ver el nombre de usuario
    console.log(USERNAME);

    fetch("http://127.0.0.1:8000/process_user", {  // URL del backend FastAPI
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: USERNAME }) // Envía el username en el cuerpo
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => console.log(data.username))
    .catch(error => console.error("Error:", error));
}