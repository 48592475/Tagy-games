document.addEventListener("DOMContentLoaded", function () {
    const mostrarInformes = document.getElementById("mostrarInformes");

    const codigoIngreso = prompt("Por favor, ingrese el código de ingreso:");
    if (codigoIngreso !== "1234") {
        alert("Código incorrecto. Acceso denegado.");
        return; 
    }
    
    mostrarInformes.style.display = "block";

    mostrarInformes.addEventListener("click", function (event) {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No se encontró el token. Debe iniciar sesión primero.");
            return;
        }

        fetch("http://localhost:3000/informe", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        })
        .then(response => {
            console.log("response", response)
            if (!response.ok) {
                throw new Error("Error al traer los informes",response);
            }
            return response.json();
        })
        .then(data => {
            const informesContainer = document.getElementById("informesContainer");
            informesContainer.innerHTML = ""; 

            data.forEach(informe => {
                const informeElement = document.createElement("p");
                informeElement.textContent = informe.texto; 
                informesContainer.appendChild(informeElement);
            });
        })
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
    });
});
