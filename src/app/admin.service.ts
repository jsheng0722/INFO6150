import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000/api/admin';
  public usernameSubject = new BehaviorSubject<string>('');
  public username$ = this.usernameSubject.asObservable();
  public isLoggedIn = false;
  private returnUrl!: string;

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    this.isLoggedIn = true;
    return this.http.post(url, { username, password }).pipe(
      tap((res: any) => {
        console.log(res);
        // Set username if login successful
        if (res.success) {
          this.setUsername(res.username);
          localStorage.setItem('admin_token', res.userToken);
          localStorage.setItem('username', "admin");
          // const tokenPayload = JSON.parse(atob(res.token.split('.')[1]));
          // const expirationDate = new Date(tokenPayload.exp * 1000);
          // localStorage.setItem('token_expiration', expirationDate.toString());
        }else{
          this.isLoggedIn = false;
        }
      }),
      catchError((error: any) => {
        // Handle error
        return throwError(error);
      })
    );
  }

  // get username
  getUsername(): string {
    return localStorage.getItem('username')!;
  }

  // set username
  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  // set return url
  setReturnUrl(url: string) {
    this.returnUrl = url;
  }
  
  // get return url
  getReturnUrl() {
    return this.returnUrl;
  }
  
  // Add this method to AuthService class
  logout(): void{
    this.isLoggedIn = false;
    localStorage.removeItem('admin_token');
    localStorage.removeItem('username');
    this.returnUrl = '';
    this.router.navigateByUrl('');
    this.setUsername('');
  }

  // judge if login already
  getisLoggedIn(): boolean {
    const token = localStorage.getItem('admin_token');
    return token !== null;
  }
}
