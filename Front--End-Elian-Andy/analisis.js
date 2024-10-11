document.addEventListener("DOMContentLoaded", function () {
    const mostrarInformes = document.getElementById("mostrarInformes");
    const informesContainer = document.getElementById("informesContainer");

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
            if (!response.ok) {
                throw new Error("Error al obtener los informes");
            }
            return response.json();
        })
        .then(data => {
            console.log("Informes obtenidos:", data);
            informesContainer.innerHTML = ""; 

            data.forEach((informe, index) => {
                const informeElement = document.createElement("div");
                informeElement.classList.add("informe-item");
                informeElement.innerHTML = `
                    <h3>Informe ${index + 1}</h3>
                    <p><strong>Usuario:</strong> ${informe.usuario}</p>
                    <p><strong>Texto:</strong> ${informe.texto}</p>
                `;
                informesContainer.appendChild(informeElement);
            });
        })
        .catch(error => {
            alert("Error: " + error.message);
            console.error("Error:", error);
        });
    });
});
