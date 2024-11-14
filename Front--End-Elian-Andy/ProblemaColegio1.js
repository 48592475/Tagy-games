function toggleTextBox(id) {
    var textBox = document.getElementById(id);
    if (textBox.classList.contains('expanded')) {
        textBox.classList.remove('expanded');
        setTimeout(function() {
            textBox.style.display = 'none';
        }, 300); 
    } else {
        textBox.style.display = 'block';
        setTimeout(function() {
            textBox.classList.add('expanded');
        }, 10); 
    }
}
const videoElement = document.getElementById('videoPlayer');
videoElement.volume = 0.5;
document.querySelectorAll('[data-audio]').forEach(botonAudio => {
    botonAudio.addEventListener('click', function(event) {
        event.preventDefault(); 
        const audioUrl = botonAudio.getAttribute('data-audio');
        const audio = new Audio(audioUrl);
        audio.play().catch(error => console.error('Error al reproducir el audio:', error));
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const consentimientoContainer = document.getElementById('consentimientoContainer');
    const botonConsentimiento = document.getElementById('botonConsentimiento');
    const videoElement = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    botonConsentimiento.addEventListener('click', async function () {
        try {
            // Oculta el botón de consentimiento
            consentimientoContainer.style.display = 'none';
            videoElement.style.display = 'block'; // Muestra el video

            // Llama a la API para obtener la URL del video
            const query = `playRelajante=${false}&playAlegre=${true}`;
            const response = await fetch(`http://localhost:3000/cancion?${query}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            console.log('Datos recibidos:', data);

            if (response.ok && data.cancion) {
                const videoUrl = data.cancion.alegres || data.cancion.relajantes;
                console.log('URL seleccionada:', videoUrl);

                if (videoUrl) {
                    videoSource.src = videoUrl;
                    videoElement.load(); // Cargar el video
                    await videoElement.play().catch(error => console.error('Error en reproducción:', error));
                } else {
                    console.error('URL del video no disponible');
                }
            } else {
                console.error('Error en la API:', response.status, data.message);
            }
        } catch (error) {
            console.error('Error al llamar a la API:', error);
        }
    });
});


document.getElementById('botonTextoProblema1').addEventListener('click', function() {
    toggleTextBox('textBox1');
});

document.getElementById('botonLecturaProblema1').addEventListener('click', function() {
    toggleTextBox('textBox2');
});

document.getElementById('botonLecturaSolucion1').addEventListener('click', function() {
    toggleTextBox('textBox3');
});

document.getElementById('botonTextoSolucion1').addEventListener('click', function() {
    toggleTextBox('textBox4');
});

document.getElementById('botonLecturaSolucion2').addEventListener('click', function() {
    toggleTextBox('textBox5');
});

document.getElementById('botonTextoSolucion2').addEventListener('click', function() {
    toggleTextBox('textBox6');
});

document.getElementById('botonLecturaSolucion3').addEventListener('click', function() {
    toggleTextBox('textBox7');
});

document.getElementById('botonTextoSolucion3').addEventListener('click', function() {
    toggleTextBox('textBox8');
});
