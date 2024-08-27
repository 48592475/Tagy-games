document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const usuario = document.getElementById('usuario').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const pregunta = document.getElementById('pregunta').value;
    const contraseña = document.getElementById('contraseña').value;
    
    const datos = {
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        pregunta: pregunta,
        contraseña: contraseña
    };
    
    try {
        const respuesta = await fetch('http://localhost:3036/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            alert('Registro exitoso');
            window.location.href = 'Pagina4.html';
        } else {
            const mensaje = await respuesta.text();
            alert('Error en el registro: ' + mensaje);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema con la solicitud. Por favor, intenta nuevamente.');
    }
});
