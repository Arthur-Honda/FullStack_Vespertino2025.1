const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Função para desenhar um quadrado
function desenhar_quadrado(x, y, tamanho, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, tamanho, tamanho);
}

// Função para desenhar uma linha
function desenhar_linha(x1, y1, x2, y2, cor) {
    ctx.strokeStyle = cor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Função para desenhar um arco
function desenhar_arco(w, x, y, raio, a, b, cor, colorr2) {
    ctx.lineWidth = w;
    ctx.strokeStyle = cor;
    ctx.fillStyle = colorr2;
    ctx.beginPath();
    ctx.arc(x, y, raio, a*Math.PI, b*Math.PI);
    ctx.stroke();
    ctx.fill();
}

function desenhar_arcov(x, y, raio, a, b, cor) {
    ctx.strokeStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, raio, a*Math.PI, b*Math.PI);
    ctx.stroke();
}
    

// Função para escrever texto
function escrever(texto, x, y, cor) {
    ctx.fillStyle = cor;
    ctx.font = "16px Arial";
    ctx.fillText(texto, x, y);
}

// canvas1
// Utilizando as funções para desenhar conforme o modelo

desenhar_quadrado(0, 0, 50, 'blue');
desenhar_quadrado(250, 0, 50, 'red');
desenhar_quadrado(270, 270, 30, 'black');
desenhar_quadrado(270, 240, 30, 'black');
desenhar_quadrado(240, 270, 30, 'black');
desenhar_quadrado(0, 270, 30, 'yellow');
desenhar_quadrado(0, 240, 30, 'yellow');
desenhar_quadrado(30, 270, 30, 'yellow');
desenhar_quadrado(0, 120, 30, 'cyan');
desenhar_quadrado(0, 150, 30, 'cyan');
desenhar_quadrado(270, 135, 30, 'cyan');
desenhar_quadrado( 110, 150, 40, 'red');




desenhar_linha(0, 0, 150, 150, 'blue');
desenhar_linha(300, 0, 150, 150, 'red');
desenhar_linha(0, 150, 300, 150, 'green');
desenhar_linha(150, 300, 150, 150, 'grey');


desenhar_arco(1, 150, 300, 35, 1, 0, 'green', 'cyan');
desenhar_arcov(150, 300, 58, 1.5, 2, 'green');
desenhar_arcov(150, 300, 80, 1, 1.5, 'green');
desenhar_arcov(150, 150, 65, 1, 2, 'green');
desenhar_arcov(150, 150, 90, 1, 1.25, 'green');
desenhar_arcov(150, 150, 90, 1.75, 2, 'green');
desenhar_arco(2, 150, 110, 15, 0, 2, 'blue', 'cyan');
desenhar_arco(2, 75, 220, 15, 0, 2, 'green', 'yellow');
desenhar_arco(2, 225, 220, 15, 0, 2, 'green', 'yellow');
    
