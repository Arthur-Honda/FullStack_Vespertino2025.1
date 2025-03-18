//window.alert("Você é pobre!");
console.log("Hello world!");
let nome = prompt("Qual seu nome?");
console.log(nome)

console.log("while")
let i = 0;
while(i<10){
    console.log(i);
    i+=1;
}

console.log("ex.1")
for(let i = 1; i<101; i+=2){
    console.log(i);
}

console.log("ex.2")
for(let i = 5; i<=500; i+=5){
    console.log(i)
}

console.log("ex.3")
let num = parseInt(prompt("Digite um número inteiro positivo:"));
if (num >= 0) {
    for (let i = num; i >= 0; i--) {
        console.log(i);
    }
} 
console.log("ex.4")
let numero = parseInt(prompt("Digite um número inteiro para calcular o fatorial:"));
if (numero >= 0) {
    let fatorial = 1;
    for (let i = 1; i <= numero; i++) {
        fatorial *= i;
    }
    console.log(`O fatorial de ${numero} é ${fatorial}`);
} else {
    console.log("Por favor, insira um número inteiro não negativo.");
}