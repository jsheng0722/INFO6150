import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  public usernameSubject = new BehaviorSubject<string>('');
  public username$ = this.usernameSubject.asObservable();
  public isLoggedIn = false;
  private returnUrl!: string;

  constructor(private router: Router, private http: HttpClient) {}
  
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    this.isLoggedIn = true;
    return this.http.post<any>(url, { email, password }).pipe(
      tap((res: any) => {
        // Set username if login successful
        if (res.success) {
          this.setUsername(res.user.username);
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('username', res.user.username);
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

  register(email: string, password: string, username: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, { email, password, username }).pipe(
      tap((res: any) => {
        // Set username if register successful
        if (res.success) {
          this.setUsername(email);
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.returnUrl = '';
    this.router.navigateByUrl('');
    this.setUsername('');
  }

  // judge if login already
  getisLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return token !== null;
  }

  // checkTokenExpiration(): void {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     try {
  //       const tokenPayload: any = jwtDecode(token);
  //       const expirationDate = new Date(tokenPayload.exp * 1000); // Convert to milliseconds
  //       const currentDate = new Date();
  //       if (expirationDate <= currentDate) {
  //         // Token has expired, log user out
  //         this.logout();
  //       }
  //     } catch (error) {
  //       // Invalid token, log user out
  //       console.error('Invalid token:', error);
  //       this.logout();
  //     }
  //   }
  // }

}
