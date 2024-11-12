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

document.getElementById('botontextosolucion1colegio1').addEventListener('click', function() {
    toggleTextBox('textBox9');
});

document.getElementById('botonlecturasolucion1colegio1').addEventListener('click', function() {
    toggleTextBox('textBox10');
});
