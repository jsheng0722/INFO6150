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

    async getTasksSlow(page: number, pageSize: number = 10): Promise<{ tasks: any[], totalPages: number } | undefined> {
      try {
        return await this.http
          .get<{ tasks: any[]; totalPages: number; }>(`${this.globalTaskApiUrl}/tasks`, {
            params: {
              page: page.toString(),
              pageSize: pageSize.toString(),
            },
          })
          .toPromise();
      } catch (error) {
        console.error('Error getting tasks:', error);
        return undefined;
      }
    }
    

    getTasks(): Observable<any> {
      return this.http
      .get(`${this.globalTaskApiUrl}/getAll`)
      .pipe(
      catchError(this.handleError));
    }

    getTaskById(taskId: string): Observable<any>{
      return this.http
      .get(`${this.globalTaskApiUrl}/getTaskId/${taskId}`)
      .pipe(catchError(this.handleError));
    }

    getTaskByMd(taskMd: string): Observable<any>{
      return this.http
      .get(`${this.globalTaskApiUrl}/getTaskMd/${taskMd}`)
      .pipe(catchError(this.handleError));
    }
  
    searchTasks(taskType: string): Observable<any> {
      return this.http
      .get(`${this.globalTaskApiUrl}/search/${taskType}`)
      .pipe(catchError(this.handleError));
    }

    deleteGlobalTask(taskMd: string): Observable<any> {
      return this.http
      .delete<any>(`${this.globalTaskApiUrl}/delete/${taskMd}`)
      .pipe(catchError(this.handleError));
    }

    // Handle error
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}