import { Component } from '@angular/core';
import { GameState } from 'src/app/interfaces/game-state';
import { Option } from 'src/app/interfaces/option';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent {
  gameState: GameState = { state: 'startingPhase' };

  handleStateChange(type: Option): void {
    console.log('Parent detected change of: ', type);

    if (this.gameState.state === 'startingPhase') {
      this.gameState.state = 'computerPhase';
    } else {
      this.gameState.state = 'resultsPhase';
    }
    console.log(this.gameState.state);
  }
}
