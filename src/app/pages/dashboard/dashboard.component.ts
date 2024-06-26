import { Component } from '@angular/core';
import { NavbarComponent, TaskComponent } from '../../components';
import { ControltaskComponent } from '../controltask/controltask.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, TaskComponent, ControltaskComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
