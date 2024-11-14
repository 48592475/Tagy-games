document.addEventListener("DOMContentLoaded", function () {
    const mostrarInformes = document.getElementById("mostrarInformes");
    const informesContainer = document.getElementById("informesContainer");
    const token = localStorage.getItem("token");
    console.log("Token en el frontend:", token);

    if (!token) {
        alert("No se encontró el token. Debe iniciar sesión primero.");
        mostrarInformes.disabled = true; // Desactiva el botón
        return;
    }

    mostrarInformes.addEventListener("click", function () {
        fetch("http://localhost:3000/informe", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            informesContainer.innerHTML = ""; // Limpia el contenedor
            data.forEach(informe => {
                // Crea un div para cada informe
                const informeDiv = document.createElement("div");
                informeDiv.classList.add("informe-box"); // Añade clase para estilo
                informeDiv.textContent = informe.texto; // Agrega el texto del informe
                informesContainer.appendChild(informeDiv);
            });
        })
        .catch(error => {
            alert("Error en la solicitud: " + error.message);
            console.error("Error en la solicitud:", error);
        });
    });
});
