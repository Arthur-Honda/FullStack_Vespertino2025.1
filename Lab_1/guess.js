

const randomNumber = Math.floor(Math.random() * 100);
let attempts = 0; // Contador de tentativas
let guesses = []; // Array para armazenar os números adivinhados

document.getElementById("guessButton").addEventListener("click", function() {
    const userGuess = parseInt(document.getElementById("guessInput").value);
    const resultElement = document.getElementById("result");
    const attemptsElement = document.getElementById("attempts");
    const guessesElement = document.getElementById("guesses");
    const imageElement = document.getElementById("image");
    
    attempts++; // Incrementa o contador de tentativas

    if (isNaN(userGuess) || userGuess < 0 || userGuess > 99) {
        resultElement.textContent = "Por favor, insira um número válido entre 0 e 99.";
        attemptsElement.textContent = ""; // Limpa as tentativas
        guessesElement.textContent = ""; // Limpa os números adivinhados
        imageElement.style.display = "none"; // Esconde a imagem
        return;
    }

    // Adiciona o palpite ao array de adivinhações
    guesses.push(userGuess);
    guessesElement.textContent = "Números adivinhados: " + guesses.join(", "); // Mostra todos os números adivinhados


    imageElement.src = "down.png"; // Caminho para a imagem de erro
    imageElement.src = "up.png"; // Caminho para a imagem de sucesso   


    if (userGuess < randomNumber) {
        resultElement.textContent = "Muito baixo! Tente novamente.";
        attemptsElement.textContent = "Tentativa " + attempts + ": " + userGuess;
        resultElement.style.color = "red"; // Muda a cor do texto para vermelho
        imageElement.src = "down.png"; // Caminho para a imagem de erro
        imageElement.style.display = "block"; // Mostra a imagem
    } else if (userGuess > randomNumber) {
        resultElement.textContent = "Muito alto! Tente novamente.";
        attemptsElement.textContent = "Tentativa " + attempts + ": " + userGuess;
        resultElement.style.color = "red"; // Muda a cor do texto para vermelho
        imageElement.src = "down.png"; // Caminho para a imagem de erro
        imageElement.style.display = "block"; // Mostra a imagem
    } else {
        resultElement.textContent = "Parabéns! Você acertou!";
        resultElement.style.color = "green"; // Muda a cor do texto para verde
        attemptsElement.textContent = "Tentativa " + attempts + ": " + userGuess;
        imageElement.src = "up.png"; // Caminho para a imagem de sucesso
        imageElement.style.display = "block"; // Mostra a imagem
    }
});