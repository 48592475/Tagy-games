document.addEventListener("DOMContentLoaded", function () {
    const mostrarInformes = document.getElementById("mostrarInformes");

    mostrarInformes.addEventListener("click", function (event) {
        event.preventDefault(); 

        const texto = document.getElementById("informesContainer").value;


        if (!usuario || !contraseña) {
            alert("Por favor, complete los campos");
            return;
        }

        const loginInfo = {
            usuario: usuario,
            contraseña: contraseña
        };

        fetch("http://localhost:3000/informe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al traer los informes"); 
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data);
            const { token } = data; 
            if (token) {
                localStorage.setItem("token", token);
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
