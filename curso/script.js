const swticher = document.querySelector(".btn");

swticher.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    var className = document.body.className;
    if (className == "dark-theme") {
        swticher.textContent = "Light";
    } else {
        swticher.textContent = "Dark";
    }



});