import {config} from "./dbconfig,js"
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            pregunta: document.getElementById('pregunta').value,
            usuario: document.getElementById('usuario').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            contraseña: document.getElementById('contraseña').value
        };

        fetch('/api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
