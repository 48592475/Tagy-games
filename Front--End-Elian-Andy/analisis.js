document.addEventListener("DOMContentLoaded", function () {
    mostrarInformes.style.display = "block";

    mostrarInformes.addEventListener("click", function (event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        console.log("Token en el frontend:", token);

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
            console.log("Response status:", response.status);
            if (!response.ok) {
                return response.text().then(text => {
                    try {
                        const errorData = JSON.parse(text); 
                        console.error("Error en la solicitud:", errorData);
                        throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
                    } catch (e) {
                        console.error("Error en la solicitud:", text);
                        throw new Error(`Error ${response.status}: ${text}`);
                    }
                });
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
            console.error("Error en la solicitud:", error);
        });
    });
});