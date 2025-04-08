const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: 50,
    width: 30,
    height: 30,
    hp: 100,
    maxHp: 100,
    attack: 10,
    healAmount: 15,
};

let enemies = [
    { x: 400, y: 300, width: 30, height: 30, hp: 50, attack: 5 },
    { x: 600, y: 200, width: 30, height: 30, hp: 70, attack: 7 },
];

let currentEnemy = null;
let enemyEncountered = false;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.hp > 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
}

function encounterEnemy() {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    currentEnemy = enemies[randomIndex];
    enemyEncountered = true;
    document.getElementById('enemyStats').innerText = 'Enemy HP: ' + currentEnemy.hp;
}

function attackEnemy() {
    if (currentEnemy && currentEnemy.hp > 0) {
        currentEnemy.hp -= player.attack;
        document.getElementById('enemyStats').innerText = 'Enemy HP: ' + currentEnemy.hp;
        if (currentEnemy.hp <= 0) {
            alert('You defeated the enemy!');
            enemyEncountered = false;
            currentEnemy = null;
            document.getElementById('enemyStats').innerText = 'Enemy HP: 0';
        } else {
            enemyAttack();
        }
    }
}

function enemyAttack() {
    if (currentEnemy) {
        player.hp -= currentEnemy.attack;
        if (player.hp <= 0) {
            alert('You have been defeated!');
            resetGame();
        }
        document.getElementById('playerStats').innerText = 'Player HP: ' + player.hp;
    }
}

function healPlayer() {
    if (player.hp < player.maxHp) {
        player.hp += player.healAmount;
        if (player.hp > player.maxHp) {
            player.hp = player.maxHp;
        }
        document.getElementById('playerStats').innerText = 'Player HP: ' + player.hp;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        player.y -= 10;
    } else if (e.key === 'ArrowDown') {
        player.y += 10;
    } else if (e.key === 'ArrowLeft') {
        player.x -= 10;
    } else if (e.key === 'ArrowRight') {
        player.x += 10;
    }

    // Check for enemy encounter
    if (!enemyEncountered) {
        enemies.forEach(enemy => {
            if (player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y) {
                encounterEnemy();
            }
        });
    }

    draw();
});

// Attack button event listener
document.getElementById('attackButton').addEventListener('click', attackEnemy);

// Heal button event listener
document.getElementById('healButton').addEventListener('click', healPlayer);

// Function to reset the game
function resetGame() {
    player.hp = player.maxHp;
    enemies.forEach(enemy => enemy.hp = Math.floor(Math.random() * 50) + 50); // Reset enemy HP
    enemyEncountered = false;
    currentEnemy = null;
    document.getElementById('playerStats').innerText = 'Player HP: ' + player.hp;
    document.getElementById('enemyStats').innerText = 'Enemy HP: 0';
    draw();
}

// Initial draw
draw();