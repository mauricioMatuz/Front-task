import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() title!: boolean;
  @Input() action!: boolean;
  @Input() subtitle!:boolean
}
