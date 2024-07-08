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
    return this.http.post(`${this.url}/task`, task);
  }

  ListTask(active:boolean): Observable<any> {
    console.log(active," jsjsjs");
    return this.http.get(`${this.url}/task`);
  }

  ListMyTask(): Observable<any> {
    return this.http.get(`${this.url}/task/my/task`);
  }

  FinishTask(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}/items`, formData);
  }
  Task(id: string): Observable<any> {
    return this.http.get(`${this.url}/task/${id}`);
  }

  Edit(id: string, task: Task): Observable<any> {
    return this.http.put(`${this.url}/task/${id}`, task);
  }
  Delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/task/${id}`);
  }
}
