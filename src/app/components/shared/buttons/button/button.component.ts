import { Component, Input } from '@angular/core';
export type ButtonType = 'button' | 'submit';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() type: ButtonType;
  @Input() customClasses: string = '';
  constructor() {
    this.type = 'button';
  }
}
