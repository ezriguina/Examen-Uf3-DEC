import { gameObject } from './gameObject.js';
import { configGame } from "../constants.js";

const { IMAGE_SIZE, WIDTH_CANVAS, SPEED_PACMAN } = configGame;

export class Pacman extends gameObject {
  constructor(row, column) {
    super(row, column);
    this.directionPacman = 1; // 1 -> right, 2 -> up, 3 -> left, 4 -> down
    this.speedPacman = configGame.SPEED_PACMAN; // Image size
    this.scorePacman = 0;
    this.pacmanlives = configGame.LIVES_PACMAN;
    this.scoreMultiplier = 1; // Multiplicador de score (1 por defecto)
    this.powerUpActive = false; // Indica si un PowerUp está activo
    this.powerUpEndTime = 0; // Tiempo en que termina el efecto del PowerUp
  }

  moveRight() {
    // Move pacman right
    let temp = this.coordXPixels + this.speedPacman;
    if (temp < 0 || temp > (WIDTH_CANVAS - IMAGE_SIZE)) {
      console.log("Error, no es pot moure a la dreta");
      return;
    } else {
      this.directionPacman = 1;
      this.coordXPixels = temp;
    }
  } // End moveRight

  moveUp() {
    let temp = this.coordYPixels - this.speedPacman;
    if (temp < 0) {
      console.log("Error, no es pot moure a l¡esquerra");
      return;
    } else {
      this.directionPacman = 2;
      this.coordYPixels = temp;
    }
  } // End moveUp

  moveDown() {
    let temp = this.coordYPixels + this.speedPacman;
    if (temp < 0) {
      console.log("Error, no es pot moure a l¡esquerra");
      return;
    } else {
      this.directionPacman = 4;
      this.coordYPixels = temp;
    }
  } // End moveDown

  moveLeft() {
    let temp = this.coordXPixels - this.speedPacman;
    if (temp < 0) {
      console.log("Error, no es pot moure a l¡esquerra");
      return;
    } else {
      this.directionPacman = 3;
      this.coordXPixels = temp;
    }
  } // End moveLeft

  testCollideRock(roca) {
    let distancia = dist(this.coordXPixels,
      this.coordYPixels, roca.coordXPixels, roca.coordYPixels);
    // console.log( "Distancia entre pacman i roca: " + distancia);

    if (distancia < IMAGE_SIZE) {
      // Has chocado con una roca
      alert("Has xocat amb una roca, has perdut una vida");
      this.pacmanlives--;
      this.spawnPacman();
    }
  }

  testCollideRock(zombie) {
    let distancia = dist(this.coordXPixels,
      this.coordYPixels, zombie.coordXPixels, zombie.coordYPixels);
    // console.log( "Distancia entre pacman i roca: " + distancia);

    if (distancia < IMAGE_SIZE) {
      // Has chocado con una roca
      alert("te ha matado el zombie Zombie, has perdut una vida");
      this.pacmanlives--;
      this.spawnPacman();
    }
  }


  testCollideFood(food) {
    let distancia = dist(this.coordXPixels,
      this.coordYPixels, food.coordXPixels, food.coordYPixels);
    // console.log( "Distancia entre pacman i roca: " + distancia);

    if (distancia < IMAGE_SIZE) {
      console.log("Has agafat una food");
      this.scorePacman += food.pointsFood * this.scoreMultiplier; // Aplicar multiplicador
      return true;
    } else {
      console.log("Food massa lluny");
      return false;
    }
  }

  testCollidePowerup(powerup) {
    let distancia = dist(this.coordXPixels,
      this.coordYPixels, powerup.coordXPixels, powerup.coordYPixels);
    // console.log( "Distancia entre pacman i roca: " + distancia);

    if (distancia < IMAGE_SIZE) {
      console.log("Has agafat una powerup");
      this.activatePowerUp(); // Activar el PowerUp
      return true;
    } else {
      console.log("Powerup massa lluny");
      return false;
    }
  }

  spawnPacman() {
    this.coordXPixels = 7 * 32;
    this.coordYPixels = 7 * 32;
  }

  // Método para activar el PowerUp
  activatePowerUp() {
    this.scoreMultiplier = 2; // Duplicar el score
    this.powerUpActive = true;
    this.powerUpEndTime = millis() + 10000; // 10 segundos de duración
  }

  // Método para desactivar el PowerUp
  deactivatePowerUp() {
    this.scoreMultiplier = 1; // Restaurar el multiplicador
    this.powerUpActive = false;
  }

  // Método para actualizar el estado del PowerUp
  updatePowerUp() {
    if (this.powerUpActive && millis() >= this.powerUpEndTime) {
      this.deactivatePowerUp();
    }
  }
}