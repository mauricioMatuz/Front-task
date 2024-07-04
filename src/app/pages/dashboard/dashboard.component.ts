import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  NavbarComponent,
  TaskComponent,
} from '../../components';
import { ControltaskComponent } from '../controltask/controltask.component';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    TaskComponent,
    ControltaskComponent,
    ButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.ListTask();
  }

  DateFormat(date: any) {
    return date.split('T')[0];
  }

  private ListAllTask() {
    this.taskService.ListTask().subscribe(
      (response) => {
        this.tasks = response;
        console.log(this.tasks);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private ListMyTask() {
    this.taskService.ListMyTask().subscribe(
      (response) => {
        console.log(response);
        this.tasks = response;
        console.log(this.tasks);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private ListTask() {
    if (localStorage.getItem('rol')?.toLowerCase() === 'admin')
      this.ListAllTask();
    else this.ListMyTask();
  }
  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Lógica para manejar el archivo seleccionado
      console.log(file);
    }
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  finalizarTask() {
     const formData = new FormData();
  }
}
