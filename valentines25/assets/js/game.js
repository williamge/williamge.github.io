import { isWall, isOpenSpace, board } from './gameboard.js';

function startGame() {
    const scoreCountElement = document.getElementById("score-count");
  // Initialize game variables
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  let player = { x: 1, y: 1, size: 20 };
  let score = 0;
  let ghosts = [{ x: 8, y: 8, size: 20 }];

  let pellets = []; 
  // Randomly assign pellets
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
        const isPlayerTile = x  == 1 && y == 1;
        const isRoseTile = x  == 8 && y == 8;
      if (isOpenSpace(x, y) && (!isPlayerTile && !isRoseTile) ) {
        if (Math.random() > 0.5) {
            pellets.push({ x, y, size: 20, alive: true });
        }
      }
    }
  }

  // Load images
  const playerImage = new Image();
  playerImage.src = "assets/images/pacman.png";
  const ghostImage = new Image();
  ghostImage.src = "assets/images/RoseOUTLINED.png";
  const pelletImage = new Image();
  pelletImage.src = "assets/images/heart.png";

  // Load game elements
  function loadGameElements() {
    updateScore();
    // Load ghosts and pellets
  }

  // Draw game elements
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tileCount = board.length;
    const tileSize = canvas.width / tileCount;

    // Draw game board
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (isWall(x, y)) {
          ctx.fillStyle = "blue";
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }

    // Draw ghosts
    ghosts.forEach((ghost) => {
        const ghostX = ghost.x * tileSize;
        const ghostY = ghost.y * tileSize;
        if (getPelletsLeftCount() == 0) {
          ctx.globalAlpha = 1;
        } else {
          ctx.globalAlpha = 0.25;
        }
      ctx.drawImage(ghostImage, ghostX, ghostY, tileSize, tileSize);
    });
    ctx.globalAlpha = 1;

    // Draw pellets (if any)
    pellets.forEach((pellet) => {
      if (pellet.alive) {
        const pelletX = pellet.x * tileSize;
        const pelletY = pellet.y * tileSize;
        ctx.drawImage(pelletImage, pelletX, pelletY, tileSize, tileSize);
      }
    });

    // Draw player
    const playerX = player.x * tileSize;
    const playerY = player.y * tileSize;
    ctx.drawImage(playerImage, playerX, playerY, tileSize, tileSize);
  }

  // Move player based on input
  function movePlayer(player, direction) {
    let nextX = player.x;
    let nextY = player.y;

    switch (direction) {
      case "up":
        nextY -= 1;
        break;
      case "down":
        nextY += 1;
        break;
      case "left":
        nextX -= 1;
        break;
      case "right":
        nextX += 1;
        break;
    }

    if (isOpenSpace(nextX, nextY)) {
      player.x = nextX;
      player.y = nextY;
    } else {
      console.log("Collision detected!");
    }
    checkCollision();
    draw();
  }

  function getPelletsLeftCount() {
return pellets.filter((pellet) => pellet.alive).length;
  }

  function updateScore() {
    const count = getPelletsLeftCount()
    scoreCountElement.innerText = count;
    if (count == 0) {
        const roseTextElement = document.getElementById("rose-text");
        roseTextElement.innerText = "The rose is unlocked! Collect it!";
    }
  }

  // Check for collisions with ghosts and pellets
  function checkCollision() {
    // Check for collisions with pellets
    pellets.forEach((pellet, index) => {
        if (pellet.alive && player.x === pellet.x && player.y === pellet.y) {
            pellet.alive = false; 
            updateScore();
        }
    });
    
    // Check for collisions with ghosts (if needed)
    if (getPelletsLeftCount() == 0) {
        ghosts.forEach((ghost, index) => {
            if (player.x === ghost.x && player.y === ghost.y) {
                document.getElementById("valentine-modal").classList.remove("hidden");
            }
        });
    }
  }

  // Start the game loop
  function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
  }

  loadGameElements();
  gameLoop();

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        movePlayer(player, "up");
        break;
      case "ArrowDown":
        movePlayer(player, "down");
        break;
      case "ArrowLeft":
        movePlayer(player, "left");
        break;
      case "ArrowRight":
        movePlayer(player, "right");
        break;
    }
  });
}

window.onload = function () {
    startGame();
};