import { Component } from '@angular/core';
import { GameResult } from 'src/app/interfaces/game-result';
import { GameState } from 'src/app/interfaces/game-state';
import { Option } from 'src/app/interfaces/option';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent {
  gameState: GameState = { state: 'startingPhase' };
  playerPick: Option = { type: 'empty' };
  computerPick: Option = { type: 'empty' };
  gameResult: GameResult = {} as GameResult;
  score: number = 0;

  handleStateChange(type: Option): void {
    if (this.gameState.state === 'startingPhase') {
      this.playerPick.type = type.type;
      this.gameState.state = 'computerPhase';
      this.initiateComputerPick();
    }
  }

  initiateComputerPick(): void {
    setTimeout(() => {
      const choice = Math.floor(Math.random() * 3) + 1;
      switch (choice) {
        case 1:
          this.computerPick.type = 'rock';
          break;
        case 2:
          this.computerPick.type = 'paper';
          break;
        case 3:
          this.computerPick.type = 'scissors';
          break;
        default:
          this.computerPick.type = 'rock';
      }

      this.inititateResultsPhase();
    }, 1000);
  }

  inititateResultsPhase(): void {
    setTimeout(() => {
      this.establishResults();
      this.gameState.state = 'resultsPhase';
    }, 1000);
  }

  establishResults(): void {
    if (this.playerPick.type === this.computerPick.type) {
      this.gameResult.result = 'DRAW';
    } else {
      if (this.playerPick.type === 'rock') {
        if (this.computerPick.type === 'paper') this.gameResult.result = 'LOSE';
        if (this.computerPick.type === 'scissors')
          this.gameResult.result = 'WIN';
      }
      if (this.playerPick.type === 'paper') {
        if (this.computerPick.type === 'rock') this.gameResult.result = 'WIN';
        if (this.computerPick.type === 'scissors')
          this.gameResult.result = 'LOSE';
      }
      if (this.playerPick.type === 'scissors') {
        if (this.computerPick.type === 'rock') this.gameResult.result = 'LOSE';
        if (this.computerPick.type === 'paper') this.gameResult.result = 'WIN';
      }
    }

    if (this.gameResult.result === 'LOSE') {
      this.score -= 1;
    } else if (this.gameResult.result === 'WIN') {
      this.score += 1;
    }
  }

  restartGame(): void {
    this.computerPick.type = 'empty';
    this.playerPick.type = 'empty';
    this.gameState.state = 'startingPhase';
  }
}
