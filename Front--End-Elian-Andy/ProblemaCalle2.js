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

document.getElementById('botontextoSolucion1calle1').addEventListener('click', function() {
    toggleTextBox('textBox9');
});

document.getElementById('botonlecturaSolucion1calle1').addEventListener('click', function() {
    toggleTextBox('textBox10');
});

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
