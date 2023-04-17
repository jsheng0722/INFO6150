import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
    private apiUrl = 'http://localhost:3000/api/task';

    constructor(private http: HttpClient) {}
  
    // add task
    addTask(task: any): Observable<any> {
        return this.http
        .post<any>(`${this.apiUrl}/add`, task)
        .pipe(catchError(this.handleError));
    }

    // delete task
    deleteTask(taskId: string): Observable<any> {
        return this.http
        .delete<any>(`${this.apiUrl}/delete/${taskId}`)
        .pipe(catchError(this.handleError));
    }
    
    // modify task
    modifyTask(taskId: string, task: any): Observable<any> {
        return this.http
        .put<any>(`${this.apiUrl}/edit/${taskId}`, task)
        .pipe(catchError(this.handleError));
    }

    // modify status
    modifyStatus(taskId: string, status: { completed: boolean }): Observable<any> {
        return this.http
        .put<any>(`${this.apiUrl}/updateCompleted/${taskId}`, status)
        .pipe(catchError(this.handleError));
    }

    getTasks(): Observable<any> {
        return this.http
        .get(`${this.apiUrl}/getAll`)
        .pipe(catchError(this.handleError));
    }
    getTaskById(taskId: string): Observable<any>{
        return this.http
        .get(`${this.apiUrl}/getId/${taskId}`)
        .pipe(catchError(this.handleError));
      }

    // Handle error
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}