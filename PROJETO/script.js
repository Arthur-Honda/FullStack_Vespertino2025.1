const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let spaceship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 30,
    speed: 5,
};

let asteroids = [];
let stars = [];
let score = 0;
let gameOver = false;

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        spaceship.x -= spaceship.speed;
        if (spaceship.x < 0) spaceship.x = 0; // Prevent going out of bounds
    } else if (event.key === 'ArrowRight') {
        spaceship.x += spaceship.speed;
        if (spaceship.x + spaceship.width > canvas.width) {
            spaceship.x = canvas.width - spaceship.width; // Prevent going out of bounds
        }
    }
});

// Function to create asteroids
function createAsteroid() {
    const x = Math.random() * (canvas.width - 30);
    asteroids.push({ x: x, y: 0, width: 30, height: 30 });
}

// Function to create stars
function createStar() {
    const x = Math.random() * (canvas.width - 20);
    stars.push({ x: x, y: 0, width: 20, height: 20 });
}

// Function to update game state
function update() {
    if (gameOver) return;

    // Move asteroids and check for collisions
    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].y += 3; // Speed of asteroids
        if (asteroids[i].y > canvas.height) {
            asteroids.splice(i, 1);
            i--;
            continue;
        }
        // Collision detection
        if (
            spaceship.x < asteroids[i].x + asteroids[i].width &&
            spaceship.x + spaceship.width > asteroids[i].x &&
            spaceship.y < asteroids[i].y + asteroids[i].height &&
            spaceship.y + spaceship.height > asteroids[i].y
        ) {
            gameOver = true;
        }
    }

    // Move stars and check for collection
    for (let i = 0; i < stars.length; i++) {
        stars[i].y += 2; // Speed of stars
        if (stars[i].y > canvas.height) {
            stars.splice(i, 1);
            i--;
            continue;
        }
        // Collision detection
        if (
            spaceship.x < stars[i].x + stars[i].width &&
            spaceship.x + spaceship.width > stars[i].x &&
            spaceship.y < stars[i].y + stars[i].height &&
            spaceship.y + spaceship.height > stars[i].y
        ) {
            score++;
            stars.splice(i, 1);
            i--;
        }
    }
}

// Function to draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw spaceship
    ctx.fillStyle = 'blue';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);

    // Draw asteroids
    ctx.fillStyle = 'gray';
    for (let asteroid of asteroids) {
        ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    }

    // Draw stars
    ctx.fillStyle = 'yellow';
    for (let star of stars) {
        ctx.fillRect(star.x, star.y, star.width, star.height);
    }

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);

    // Draw game over message
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Main game loop
function gameLoop() {
    if (gameOver) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

// Start the game
setInterval(() => {
    if (!gameOver) {
        createAsteroid();
        if (Math.random() < 0.5) createStar(); // Randomly create stars
    }
}, 1000); // Create asteroids and stars every second

gameLoop(); // Start the game loop