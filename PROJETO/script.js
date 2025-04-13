const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.5;
let keys = {};
let currentLevel = 1;
let enemySpeed = 1;
let gameWon = false;

document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

// Jogador
const player = {
  x: 100,
  y: 300,
  width: 40,
  height: 60,
  speed: 4,
  vy: 0,
  onGround: false,
  bullets: [],
};

// Plataformas
const platforms = [
  { x: 0, y: 550, width: 800, height: 50 },
  { x: 250, y: 400, width: 200, height: 20 },
];

// Inimigos
const enemies = [];

function generateEnemies(level) {
  enemies.length = 0;
  if (level < 5) {
    for (let i = 0; i < level + 1; i++) {
      enemies.push({
        x: 600 + i * 80,
        y: 500,
        width: 40,
        height: 60,
        alive: true,
        vx: enemySpeed
      });
    }
  } else {
    // Fase do chefão
    enemies.push({
      x: 600,
      y: 480,
      width: 80,
      height: 100,
      alive: true,
      vx: 1,
      health: 10,
      isBoss: true
    });
  }
}

function shoot() {
  player.bullets.push({
    x: player.x + player.width,
    y: player.y + player.height / 2,
    vx: 6
  });
}

function update() {
  if (gameWon) return;

  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowUp"] && player.onGround) {
    player.vy = -10;
    player.onGround = false;
  }

  if (keys["Space"]) {
    if (
      player.bullets.length === 0 ||
      player.bullets[player.bullets.length - 1].x - player.x > 40
    ) {
      shoot();
    }
  }

  player.vy += GRAVITY;
  player.y += player.vy;

  player.onGround = false;
  platforms.forEach(p => {
    if (
      player.x < p.x + p.width &&
      player.x + player.width > p.x &&
      player.y + player.height < p.y + 10 &&
      player.y + player.height + player.vy >= p.y
    ) {
      player.y = p.y - player.height;
      player.vy = 0;
      player.onGround = true;
    }
  });

  player.bullets.forEach(b => b.x += b.vx);
  player.bullets = player.bullets.filter(b => b.x < canvas.width);

  // Inimigo comum ou chefão
  enemies.forEach(e => {
    if (!e.alive) return;

    e.x -= e.vx;
    if (e.x + e.width < 0) e.x = canvas.width;

    player.bullets.forEach(bullet => {
      if (
        bullet.x < e.x + e.width &&
        bullet.x + 10 > e.x &&
        bullet.y < e.y + e.height &&
        bullet.y + 5 > e.y
      ) {
        if (e.isBoss) {
          e.health--;
          if (e.health <= 0) {
            e.alive = false;
          }
        } else {
          e.alive = false;
        }
      }
    });
  });

  checkLevelComplete();
}

function checkLevelComplete() {
  const allDead = enemies.every(e => !e.alive);
  if (allDead) {
    if (currentLevel < 5) {
      currentLevel++;
      enemySpeed += 0.5;
      generateEnemies(currentLevel);
    } else {
      gameWon = true;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fundo preto
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Jogador (azul)
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Plataformas (marrom)
  ctx.fillStyle = "brown";
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));

  // Inimigos
  enemies.forEach(e => {
    if (!e.alive) return;
    ctx.fillStyle = e.isBoss ? "purple" : "red";
    ctx.fillRect(e.x, e.y, e.width, e.height);

    if (e.isBoss) {
      ctx.fillStyle = "white";
      ctx.fillText(`HP: ${e.health}`, e.x + 10, e.y - 5);
    }
  });

  // Tiros (amarelo)
  ctx.fillStyle = "yellow";
  player.bullets.forEach(b => ctx.fillRect(b.x, b.y, 10, 5));

  // HUD
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Fase: ${currentLevel}`, 20, 30);

  if (gameWon) {
    ctx.fillStyle = "lime";
    ctx.font = "40px Arial";
    ctx.fillText("Você venceu o jogo!", 220, 300);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

generateEnemies(currentLevel);
gameLoop();
