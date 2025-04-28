// Função para mostrar/esconder o menu
const menuButton = document.getElementById("menuButton");
const menuOptions = document.getElementById("menuOptions");

menuButton.addEventListener("click", function() {
    // Alterna entre mostrar e esconder o menu
    if (menuOptions.style.display === "block") {
        menuOptions.style.display = "none";
    } else {
        menuOptions.style.display = "block";
    }
});
