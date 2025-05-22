// Variables globales para la configuración del juego
let gameDifficulty = "easy"; // Dificultad por defecto
let totalTime = 120000; // Tiempo total en milisegundos (2 minutos por defecto)
let foodCount = 50; // Cantidad de comida por defecto

// Función para seleccionar la dificultad
function selectDifficulty(difficulty) {
  gameDifficulty = difficulty;

  // Ajustar la configuración del juego según la dificultad
  switch (difficulty) {
    case "easy":
      totalTime = 120000; // 2 minutos
      foodCount = 50;
      alert('Dificultad seleccionada: Fácil');
      break;
    case "normal":
      totalTime = 90000; // 1.5 minutos
      foodCount = 50;
      alert('Dificultad seleccionada: Normal');
      break;
    case "hard":
      totalTime = 120000; // 2 minutos
      foodCount = 25; // Menos comida
      alert('Dificultad seleccionada: Difícil');
      break;
    default:
      console.error("Dificultad no válida");
      break;
  }
}

// Función para iniciar el juego con la dificultad seleccionada
function startGame() {
  if (!gameStarted && !gameOver) {
    alert('El juego ha comenzado!');
    gameStarted = true;
    gameOver = false;
    resumeGame();
  } else {
    alert('El juego ya está en marcha.');
  }
}

// Función para pausar el juego
function pauseGame() {
  if (gameStarted && !gameOver) {
    gamePaused = !gamePaused;
    if (gamePaused) {
      alert('El juego ha sido pausado!');
    } else {
      alert('El juego ha sido reanudado!');
      resumeGame();
    }
  }
}

// Función para reiniciar el juego
function restartGame() {
  if (gameStarted || gameOver) {
    alert('El juego ha sido reiniciado!');
    gamePaused = false;
    gameStarted = false;
    gameOver = false;
    // Aquí puedes reiniciar el estado del juego
  }
}

// Función para terminar el juego
function endGame() {
  if (gameStarted && !gameOver) {
    alert('El juego ha terminado!');
    gameOver = true;
    // Aquí puedes mostrar la puntuación final o realizar otras acciones
  }
}

// Event listeners para los botones de dificultad
document.getElementById('easy').addEventListener('click', () => selectDifficulty("easy"));
document.getElementById('normal').addEventListener('click', () => selectDifficulty("normal"));
document.getElementById('hard').addEventListener('click', () => selectDifficulty("hard"));

// Event listeners para los botones de control del juego
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('pause-game').addEventListener('click', pauseGame);
document.getElementById('restart-game').addEventListener('click', restartGame);
document.getElementById('end-game').addEventListener('click', endGame);

// Variables de estado del juego
let gamePaused = false;
let gameStarted = false;
let gameOver = false;