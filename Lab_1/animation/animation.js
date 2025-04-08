const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = 'cricri.png'; // Substitua pelo caminho da sua imagem

let mouseX = 0;
let mouseY = 0;

// Defina a largura e a altura desejadas para a imagem
const imageWidth = 100; // Largura da imagem
const imageHeight = 80; // Altura da imagem

// Função para desenhar a imagem no canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    ctx.drawImage(img, mouseX - imageWidth / 2, mouseY - imageHeight / 2, imageWidth, imageHeight); // Desenha a imagem redimensionada
}

// Evento para capturar a posição do mouse
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    draw();
});

// Mantém a imagem dentro do canvas mesmo se o mouse sair
canvas.addEventListener('mouseleave', () => {
    const rect = canvas.getBoundingClientRect();
    mouseX = Math.max(0, Math.min(mouseX, canvas.width));
    mouseY = Math.max(0, Math.min(mouseY, canvas.height));
    draw();
});

// Desenha a imagem pela primeira vez quando a imagem estiver carregada
img.onload = () => {
    draw();
};