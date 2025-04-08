// let carro = {
//     cor: 'green',
//     modelo: 'SUV',
//     marca: 'Toyota',
//     buzina: function(){
//         return 'biii biiiiiiiiiiiiiiiiiiii'
//     }
// }

// let carro2 = {
//     cor: 'black',
//     modelo: 'Sedan',
//     marca: 'Ford',
//     buzina: function(){
//         return 'fon fooon'
//     }
// }


// class Carro {
//     constructor(cor, modelo, marca){
//         this.cor = cor;
//         this.modelo = modelo;
//         this.marca = marca;
//     }
//     buzina(){
//         return 'biii biiiiiiiiiiiiiiiiiiii'
//     }
// }

// let carro1 = new Carro('green', 'SUV', 'Toyota');
// console.log(carro1);
// let carro2 = new Carro('black', 'Sedan', 'Ford');
// console.log(carro2);



// console.log(carro);
// console.log(carro2)
// console.log(carro.cor);
// console.log(carro.buzina());
// console.log(carro2.buzina())

// let carros = []
// carros.push(carro1);
// carros.push(carro2);
// for (let i = 0; i  < carros.length; i++){
//     console.log(carros[i].buzina())
// }



class retangulo{
    constructor(cor_linha, cor_preenchimento, espessura_linha, x, y, largura, altura){
        this.cor_linha = cor_linha; 
        this.cor_preenchimento = cor_preenchimento;
        this.espessura_linha = espessura_linha;
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura; 
    }
    desenhe(contexto){
        contexto.beginPath();
        contexto.lineWidth = this.espessura_linha;
        contexto.fillStyle = this.cor_preenchimento;
        contexto.strokeStyle = this.cor_linha;
        contexto.fillRect(this.x, this.y, this.largura, this.altura);
        contexto.strokeRect(this.x, this.y, this.largura, this.altura);
        contexto.closePath();
    }
}

let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d');

let ret1 = new retangulo('blue', 'red', 3, 0, 0, 20, 20);
let ret2 = new retangulo('green', 'yellow', 3, 200, 200, 20, 20);
let ret3 = new retangulo('black', 'white', 3, 200, 200, 20, 20);


// ret1.x = 100;
// ret1.desenhe(ctx1)

function animacao(){
    if(ret1.x > 400){
        ret1.x = 0;
    }
    ret1.x +=1;
    ctx1.clearRect(0, 0, 400, 400);
    ret1.desenhe(ctx1);
    ret2.desenhe(ctx1);
    ret3.desenhe(ctx1);


    requestAnimationFrame(animacao);
}

animacao(ctx1)


document.addEventListener('keydown', function(event){
    let tecla = event.key;
    console.log(tecla);  
    let velocidade = 15;   

    if(event.key == 'ArrowUp'){ret2.y -= velocidade}
    if(event.key == 'ArrowDown'){ret2.y += velocidade}
    if(event.key == 'ArrowLeft'){ret2.x -= velocidade}
    if(event.key == 'ArrowRight'){ret2.x += velocidade}
})





document.addEventListener('mousemove', function(evento){
    let rect = canvas1.getBoundingClientRect();
    let x_mouse = evento.clientX - rect.left;
    let y_mouse = evento.clientY - rect.top;
    console.log('X: ' + x_mouse + ' Y: ' + y_mouse);

    ret3.x = x_mouse;
    ret3.y = y_mouse;
})