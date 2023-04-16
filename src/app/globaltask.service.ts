import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class GlobaltaskService {
    private globalTaskApiUrl = 'http://localhost:3000/api/globaltask';

    constructor(private http: HttpClient) {}

    // upload task
    uploadTask(task: any): Observable<any> {
      return this.http
        .post(`${this.globalTaskApiUrl}/upload`, task)
        .pipe(catchError(this.handleError));
    }

    getTasks(): Observable<any> {
      return this.http
      .get(`${this.globalTaskApiUrl}/getAll`)
      .pipe(
      catchError(this.handleError));
    }

    getTaskById(taskId: String): Observable<any>{
      return this.http
      .get(`${this.globalTaskApiUrl}/getTask/${taskId}`)
      .pipe(catchError(this.handleError));
    }
  
    searchTasks(taskType: string): Observable<any> {
      return this.http
      .get(`${this.globalTaskApiUrl}/search/${taskType}`)
      .pipe(catchError(this.handleError));
    }

    // Handle error
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}