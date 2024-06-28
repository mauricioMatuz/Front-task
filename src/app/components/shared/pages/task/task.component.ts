import { Component, OnInit } from '@angular/core';
import { AutocompleteComponent } from '../../controls';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../models/backend/User';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [AutocompleteComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {}
