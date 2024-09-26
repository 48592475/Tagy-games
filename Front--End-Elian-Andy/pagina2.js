document.addEventListener("DOMContentLoaded", function(){
    const buttonLogin = document.getElementById("buttonLogin");

    buttonLogin.addEventListener("click", function(event)) {
        event.preventDefault();

        const nombre = document.getElementById("UsuarioInicio").ariaValueMax;
        const password = document.getElementById("ContraseñaInicio");

        if(!nombre || !password){
            alert("Por favor, complete los campos");
            return;
        }
        
        const infoPersona = {
            nombre: nombre,     //el primer nombre de la clase, tiene que ser el nombre del campo de la base de datos
            password: password  //y el segundo es el nombre de la variable creada arriba (const nombre) --> ejemplo*
        };

        fetch("//url")
    }
})