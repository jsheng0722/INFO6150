import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  imagePath = 'assets/images';
  username: string | null = null;
  private usernameSub: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  private closeOffcanvasSubject = new BehaviorSubject<boolean>(false);
  closeOffcanvas$ = this.closeOffcanvasSubject.asObservable();

  closeOffcanvas() {
    this.closeOffcanvasSubject.next(true);
  }
  
  ngOnInit(): void {
    this.usernameSub = this.authService.usernameSubject.subscribe(username => {
      this.username = username;
      console.log(username)
    });
    const isLoggedIn = this.authService.getisLoggedIn();
    if (isLoggedIn) {
      const username = localStorage.getItem('username');
      this.username = username ? username : null;
    }
  }

  // Unsubscribe to usernameSubject to prevent memory leaks
  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }

  // Add this method to HeaderComponent class
  logout(): void {
    this.authService.logout();
    this.username = null;
  }
}
