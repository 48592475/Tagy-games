document.addEventListener("DOMContentLoaded", function () {
    const mostrarInformes = document.getElementById("mostrarInformes");
    const informesContainer = document.getElementById("informesContainer");

    mostrarInformes.addEventListener("click", function () {
        informesContainer.style.display = "block";
        informesContainer.innerHTML = "<p>Preparate</p>";
    });
});
