import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameState } from 'src/app/interfaces/game-state';
import { Option } from 'src/app/interfaces/option';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
})
export class OptionComponent implements OnInit {
  scissorsGradient1: string = 'hsl(39, 89%, 49%)';
  scissorsGradient2: string = 'hsl(40, 84%, 53%)';
  paperGradient1: string = 'hsl(230, 89%, 62%)';
  paperGradient2: string = 'hsl(230, 89%, 65%)';
  rockGradient1: string = 'hsl(349, 71%, 52%)';
  rockGradient2: string = 'hsl(349, 70%, 56%)';

  @Input() type: Option = {} as Option;
  @Output() optionClick = new EventEmitter<Option>();

  optionStyles: Record<string, string> = {};
  ringStyles: Record<string, string> = {};

  ngOnInit(): void {
    this.optionStyles = {
      background: `url('./assets/images/icon-${this.type.type}.svg') white`,
      backgroundSize: '75%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
    this.ringStyles = {
      background:
        this.type.type == 'rock'
          ? `radial-gradient(${this.rockGradient1}, ${this.rockGradient2})`
          : this.type.type == 'paper'
          ? `radial-gradient(${this.paperGradient1}, ${this.paperGradient2})`
          : `radial-gradient(${this.scissorsGradient1}, ${this.scissorsGradient2})`,
    };
  }

  optionClicked(): void {
    this.optionClick.emit(this.type);
  }
}
