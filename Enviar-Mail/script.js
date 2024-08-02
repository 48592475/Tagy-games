const btn = document.getElementById("button");
document.getElementById("form")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        btn.value = "Enviando...";

        const serviceID = "service_91vvjan";
        const templateID = "template_67jfare";

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = "Send Mail";
                alert("Enviado!");
            })
            .catch((err) => {
                btn.value = "Send Mail";
                alert(JSON.stringify(err));
            });
    });
