let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d');

// retângulos
ctx1.beginPath();
ctx1.lineWidth = 5;
ctx1.fillStyle = 'red';
ctx1.fillRect(0,0,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 5;
ctx1.fillStyle = 'blue';
ctx1.fillRect(350,0,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 5;
ctx1.fillStyle = 'green';
ctx1.fillRect(350,350,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 5;
ctx1.fillStyle = 'yellow';
ctx1.fillRect(0,350,50,50);
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.fillStyle = 'ivory';
ctx1.strokeStyle = 'green';
ctx1.arc(200,200,50,0*Math.PI,1*Math.PI);
ctx1.fill();
ctx1.stroke();
ctx1.closePath();

ctx1.strokeStyle = 'red'; // Cor da linha
ctx1.lineWidth = 2; // Largura da linha
// Começar a desenhar a linha
ctx1.beginPath(); // Iniciar um novo caminho
ctx1.moveTo(0, 0); // Ponto inicial da linha (x1, y1)
ctx1.lineTo(400, 400); // Ponto final da linha (x2, y2)
ctx1.stroke(); // Desenhar a lin

ctx1.strokeStyle = 'blue'; // Cor da linha
ctx1.lineWidth = 2; // Largura da linha
// Começar a desenhar a linha
ctx1.beginPath(); // Iniciar um novo caminho
ctx1.moveTo(400, 0); // Ponto inicial da linha (x1, y1)
ctx1.lineTo(0, 400); // Ponto final da linha (x2, y2)
ctx1.stroke(); // Desenhar a lin

ctx1.strokeStyle = 'green'; // Cor da linha
ctx1.lineWidth = 2; // Largura da linha
// Começar a desenhar a linha
ctx1.beginPath(); // Iniciar um novo caminho
ctx1.moveTo(0, 200); // Ponto inicial da linha (x1, y1)
ctx1.lineTo(400, 200); // Ponto final da linha (x2, y2)
ctx1.stroke(); // Desenhar a lin

// arcos
ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.fillStyle = 'yellow';
ctx1.strokeStyle = 'green';
ctx1.arc(50,120,25,0*Math.PI,2*Math.PI);
ctx1.fill();
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.fillStyle = '';
ctx1.strokeStyle = 'green';
ctx1.arc(360,120,25,0*Math.PI,2*Math.PI);
ctx1.fill();
ctx1.stroke();
ctx1.closePath();



let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
















