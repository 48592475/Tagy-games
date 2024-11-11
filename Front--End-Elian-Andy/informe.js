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
        informesContainer.style.display = "block";
        informesContainer.innerHTML = "<p>Preparate</p>";
    });
});
