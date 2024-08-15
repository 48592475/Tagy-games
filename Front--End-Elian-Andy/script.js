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
