/*const button = document.createElement("button");
button.type = "button";
button.innerText = "button";
document.body.appendChild(button);*/

document.getElementById('botonTextoSolucion1').addEventListener('click', function() {
    toggleTextBox('textBox1');
});

document.getElementById('botonTextoSolucion2').addEventListener('click', function() {
    toggleTextBox('textBox2');
});

document.getElementById('botonTextoSolucion3').addEventListener('click', function() {
    toggleTextBox('textBox3');
});
document.getElementById('botonTextoProblemacasa1').addEventListener('click', function() {
    toggleTextBox('textBox4');
});

document.getElementById('botonLecturaSolución1').addEventListener('click', function() {
    toggleTextBox('textBox5');
});

document.getElementById('botonLecturaSolución2').addEventListener('click', function() {
    toggleTextBox('textBox6');
});

document.getElementById('botonLecturaSolución3').addEventListener('click', function() {
    toggleTextBox('textBox7');
});

document.getElementById('botonLecturaProblemacasa1').addEventListener('click', function() {
    toggleTextBox('textBox8');
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

zx
