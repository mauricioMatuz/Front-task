import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../models/backend/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  CrateTask(task: Task): Observable<any> {
    console.log(task, ' esto va antes del post ', typeof task.userId);
    return this.http.post(`${this.url}/task`, task);
  }

  ListTask(): Observable<any> {
    return this.http.get(`${this.url}/task`);
  }

  ListMyTask(): Observable<any> {
    return this.http.get(`${this.url}/task/my/task`);
  }
}
