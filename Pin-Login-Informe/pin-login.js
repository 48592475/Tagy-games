class PinLogin {
    constructor({ el, loginEndpoint, redirectTo, maxNumbers = 4 }) {
        this.el = {
            main: el,
            numberPad: el.querySelector(".pin-login__numpad"),
            textDisplay: el.querySelector(".pin-login__text"),
        };
        this.loginEndpoint = loginEndpoint;
        this.redirectTo = redirectTo;
        this.maxNumbers = maxNumbers;
        this.value = "";
        this._generatePad();
    }


    _generatePad() {
        const padLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "backspace", "0", "done",
        ];
        padLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEl = document.createElement("div");
            keyEl.classList.add("pin-login__key");
            keyEl.classList.toggle("material-icons", isNaN(key));
            keyEl.textContent = key;
            keyEl.addEventListener("click", () => { this._handleKeyPress(key) });
            this.el.numberPad.appendChild(keyEl);
            if (insertBreak) {
                this.el.numberPad.appendChild(document.createElement("br"));
            }
        });
    }


    _handleKeyPress(key) {
        if (key === "backspace") {
            this.value = this.value.slice(0, -1);
        } else if (key === "done") {
            this._submit();
        } else {
            if (this.value.length < this.maxNumbers) {
                this.value += key;
            }
        }
        this.el.textDisplay.value = "*".repeat(this.value.length);
    }


    _submit() {
        if (this.value === "1234") {
            window.location.href = this.redirectTo;
        } else {
            alert("PIN incorrecto");
            this.value = "";
            this.el.textDisplay.value = "";
        }
    }
}


