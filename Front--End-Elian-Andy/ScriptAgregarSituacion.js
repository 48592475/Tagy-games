// ScriptAgregarSituacion.js

// Previsualizar imágenes
function previewImage(input, previewElementId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewElement = document.getElementById(previewElementId);
            previewElement.src = e.target.result;
            previewElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('imagenSituacion').addEventListener('change', function () {
    previewImage(this, 'previewImagenSituacion');
});

document.getElementById('imagenSolucionA').addEventListener('change', function () {
    previewImage(this, 'previewImagenSolucionA');
});

// Grabar audio
let mediaRecorder;
let audioChunks = [];
function startRecording(audioElementId) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioElement = document.getElementById(audioElementId);
                audioElement.src = audioUrl;
                audioChunks = [];
            });
        });
}

document.getElementById('grabarAudioSituacion').addEventListener('click', function () {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    } else {
        startRecording('previewAudioSituacion');
    }
});

document.getElementById('grabarAudioSolucionA').addEventListener('click', function () {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    } else {
        startRecording('previewAudioSolucionA');
    }
});
