import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export interface Notification {
  message: string;
}
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  encapsulation: ViewEncapsulation.None, // Deshabilitar la encapsulación de estilos
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) {}
}
