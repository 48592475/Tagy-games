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

async function llamarAPIEmocion(playRelajante, playAlegre) {
    try {
        const query = `playRelajante=${playRelajante}&playAlegre=${playAlegre}`;
        const response = await fetch(`http://localhost:3000/cancion?${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (response.ok) {
            if (data.cancion) {
                console.log(`Emoción: ${data.emocion}, Canción: ${data.cancion.titulo}`);

                const videoElement = document.getElementById('videoPlayer');
                const videoSource = document.getElementById('videoSource'); 

                const videoUrl = playAlegre ? data.cancion.alegres : data.cancion.relajantes;
                console.log('URL seleccionada:', videoUrl);

                if (videoUrl) {
                    videoSource.src = videoUrl;
                    videoElement.load(); 

                    videoElement.muted = true;

                    await videoElement.play().catch(error => {
                        console.error('No se pudo reproducir automáticamente:', error);
                    });

                    setTimeout(() => {
                        videoElement.muted = false; 
                    }, 500);  
                } else {
                    console.error('URL del video no disponible para la emoción especificada');
                }
            } else {
                console.error('Canción no definida en la respuesta', data);
            }
        } else {
            console.error('Error en la API:', data.message);
        }
    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    llamarAPIEmocion(false, true); 
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
