const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'cricri.png'; // Substitua pelo caminho da sua imagem

let mouseX = 0;
let mouseY = 0;

const imageWidth = 100;
const imageHeight = 80;

// Garante que a imagem fique dentro do canvas
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, mouseX - imageWidth / 2, mouseY - imageHeight / 2, imageWidth, imageHeight);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Limita para que a imagem não ultrapasse o canvas
    mouseX = clamp(x, imageWidth / 2, canvas.width - imageWidth / 2);
    mouseY = clamp(y, imageHeight / 2, canvas.height - imageHeight / 2);

    draw();
});

// Se o mouse sair, a imagem permanece onde estava (sem update)
canvas.addEventListener('mouseleave', () => {
    draw(); // apenas redesenha, já está em posição válida
});

img.onload = () => {
    // Centraliza a imagem no início
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
    draw();
};
