import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  NavbarComponent,
  TaskComponent,
} from '../../components';
import { ControltaskComponent } from '../controltask/controltask.component';
import { TaskService } from '../../services/task/task.service';
import { AlretsService } from '../../services/alert/alrets.service';

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
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  selectedFile!: File;
  showCompleted = true;

  constructor(
    private taskService: TaskService,
    private alertService: AlretsService
  ) {}

  ngOnInit(): void {
    this.ListTask();
  }

  DateFormat(date: any) {
    return date.split('T')[0];
  }

  private ListAllTask() {
    console.log('Fetching tasks with showCompleted:', this.showCompleted);
    this.taskService.ListTask(this.showCompleted).subscribe(
      (response) => {
        console.log(response," a ver q p2");
        this.tasks = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private ListMyTask() {
    this.taskService.ListMyTask().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ListTask() {
    if (localStorage.getItem('rol')?.toLowerCase() === 'admin')
      this.ListAllTask();
    else this.ListMyTask();
  }

  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event, idTask: string, title: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.onSubmit(idTask, title);
    }
  }

  onSubmit(idTask: string, title: string): void {
    if (this.selectedFile) {
      this.alertService
        .showConfirmationAlert(
          '¿Está seguro de querer finalizar la tarea?',
          'Esta acción no se puede deshacer',
          'warning',
          true
        )
        .then((result) => {
          if (result.isConfirmed) {
            // Verifica si el usuario confirmó la acción
            this.uploadFile(idTask, title);
          }
        });
    }
  }

  uploadFile(idTask: string, title: string) {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('idTask', idTask);
    this.taskService.FinishTask(formData).subscribe(
      (response) => {
        this.alertService.MinShowSucces(
          'Tarea finalizada',
          'success',
          `Tarea ${title} finalizada`,
          'center'
        );
        this.ListTask();
      },
      (error) => {
        console.log(error, ' waos todo mal :c');
      }
    );
  }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
    this.ListTask();
  }
}
