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
    ctx.font = "18px Arial";
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
desenhar_arco(3, 150, 110, 15, 0, 2, 'blue', 'cyan');
desenhar_arco(3, 75, 220, 15, 0, 2, 'green', 'yellow');
desenhar_arco(3, 225, 220, 15, 0, 2, 'green', 'yellow');

escrever('Canvas', 120, 50, 'black');

//-------------------------------------------------------------------------------
const canvas2 = document.getElementById('myCanvas2');
const cntx = canvas2.getContext('2d');

// Função para desenhar um quadrado
function desenhar_quadrados(x, y, tamanho, tamanho2, cor) {
    cntx.fillStyle = cor;
    cntx.fillRect(x, y, tamanho, tamanho2);
}

// Função para desenhar uma linha
function desenhar_linhas(x1, y1, x2, y2, cor) {
    cntx.strokeStyle = cor;
    cntx.beginPath();
    cntx.moveTo(x1, y1);
    cntx.lineTo(x2, y2);
    cntx.stroke();
}

// Função para desenhar um arco
function desenhar_arcos(w, x, y, raio, a, b, cor, colorr2) {
    cntx.lineWidth = w;
    cntx.strokeStyle = cor;
    cntx.fillStyle = colorr2;
    cntx.beginPath();
    cntx.arc(x, y, raio, a*Math.PI, b*Math.PI);
    cntx.stroke();
    cntx.fill();
}

function desenhar_arkos(x, y, raio, a, b, cor, colorr2) {
    cntx.strokeStyle = cor;
    cntx.fillStyle = colorr2;
    cntx.beginPath();
    cntx.arc(x, y, raio, a*Math.PI, b*Math.PI);
    cntx.stroke();
    cntx.fill();
}

function desenhar_arcovs(x, y, raio, a, b, cor, corr) {
    cntx.strokeStyle = cor;
    cntx.fillStyle = corr;
    cntx.beginPath();
    cntx.arc(x, y, raio, a*Math.PI, b*Math.PI);
    cntx.stroke();
    cntx.fill();
}
   
// Função para escrever texto
function escrevers(texto, x, y, cor) {
    cntx.fillStyle = cor;
    cntx.font = "18px Arial";
    cntx.fillText(texto, x, y);
}

function desenhar_triangulo(x1, y1, x2, y2, x3, y3, cor) {
    cntx.fillStyle = cor;
    cntx.beginPath(); 
    cntx.moveTo(x1, y1); 
    cntx.lineTo(x2, y2); 
    cntx.lineTo(x3, y3); 
    cntx.closePath(); 
    cntx.fill(); 
}




desenhar_quadrados(40, 220, 280, 80, 'slategray');
desenhar_quadrados(0, 220, 40, 40, 'dodgerblue');
desenhar_quadrados(0, 260, 80, 40, 'dodgerblue');
desenhar_quadrados(40, 260, 80, 40, 'dodgerblue');
desenhar_quadrados(120, 150, 70, 70, 'Sienna');
desenhar_quadrados(40, 180, 15, 40, 'Sienna');
desenhar_quadrados(147, 180, 15, 40, 'SaddleBrown');
desenhar_quadrados(260, 215, 15, 40, 'Sienna');

desenhar_quadrados(127, 160, 20, 20, 'LightSkyBlue');
desenhar_quadrados(162, 160, 20, 20, 'LightSkyBlue');

desenhar_arcovs(120, 300, 39, 1, 2, 'dodgerblue', 'dodgerblue');
desenhar_arcovs(0, 220, 39, 1, 2, 'dodgerblue', 'dodgerblue');
desenhar_arcovs(47, 170, 21, 0, 2, 'green', 'green');
desenhar_arcovs(267, 205, 21, 0, 2, 'green', 'green');
desenhar_arcovs(230, 70, 35, 0, 2, 'yellow', 'yellow');

desenhar_triangulo(120, 150, 155, 110, 190, 150, 'salmon');





