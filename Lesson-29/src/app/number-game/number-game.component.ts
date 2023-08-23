import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-game',
  templateUrl: './number-game.component.html',
  styleUrls: ['./number-game.component.css']
})
export class NumberGameComponent implements OnInit {
  targetNumber!: number;
  userGuess!: number;
  attempts: number = 0;
  maxAttempts: number = 5;
  message: string = '';
  isGameStarted: boolean = false;

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.isGameStarted = true;
    this.targetNumber = Math.floor(Math.random() * 100) + 1;
    this.userGuess = 0; // Provide an initial value
    this.attempts = 0;
    this.message = '';
  }

  checkGuess(): void {
    if (this.userGuess === this.targetNumber) {
      this.message = `Congratulations! You guessed the number ${this.targetNumber} in ${this.attempts} attempts.`;
    } else if (this.userGuess < this.targetNumber) {
      this.message = 'Masukkan angka yang lebih besar dari angka tersebut.';
    } else {
      this.message = 'Masukkan angka yang lebih rendah dari angka tersebut.';
    }

    this.attempts++;

    if (this.attempts >= this.maxAttempts) {
      this.message = `Sorry, you've used all ${this.maxAttempts} attempts. The correct number was ${this.targetNumber}.`;
    }
  }
}
