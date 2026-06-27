const commonPasswords = ["123456", "password", "qwerty", "abc123"];

function checkStrength() {
    let password = document.getElementById("password").value;
    let bar = document.getElementById("bar");
    let strengthText = document.getElementById("strength");
    let timeText = document.getElementById("time");

    if (commonPasswords.includes(password)) {
        strengthText.innerText = "Very Weak (Common Password)";
        bar.style.width = "20%";
        bar.style.background = "darkred";
        timeText.innerText = "Crack Time: Instantly";
        return;
    }

    let checks = {
        len: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        num: /[0-9]/.test(password),
        special: /[!@#$%^&*]/.test(password)
    };

    Object.keys(checks).forEach(id => {
        let el = document.getElementById(id);
        el.innerText = (checks[id] ? "✔ " : "❌ ") + el.innerText.slice(2);
    });

    let score = Object.values(checks).filter(Boolean).length;

    if (password.length === 0) {
        bar.style.width = "0%";
        strengthText.innerText = "";
        timeText.innerText = "";
        return;
    }

    if (score <= 2) {
        bar.style.width = "30%";
        bar.style.background = "red";
        strengthText.innerText = "Weak";
        timeText.innerText = "Crack Time: Seconds";
    } 
    else if (score <= 4) {
        bar.style.width = "65%";
        bar.style.background = "orange";
        strengthText.innerText = "Medium";
        timeText.innerText = "Crack Time: Hours";
    } 
    else {
        bar.style.width = "100%";
        bar.style.background = "limegreen";
        strengthText.innerText = "Strong";
        timeText.innerText = "Crack Time: Years";
    }
}

function togglePassword() {
    let input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
}

function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < 12; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("password").value = password;
    checkStrength();
}

function copyPassword() {
    let input = document.getElementById("password");
    input.select();
    document.execCommand("copy");
    alert("Copied!");
}