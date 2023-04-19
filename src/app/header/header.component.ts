import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  imagePath = 'assets/images';
  username: string | null = null;

  private usernameSub: Subscription = new Subscription();

  constructor(private authService: AuthService, private adminService: AdminService) {}

  isUserLoggedIn = this.authService.getisLoggedIn();
  isAdminLoggedIn = this.adminService.getisLoggedIn();

  private closeOffcanvasSubject = new BehaviorSubject<boolean>(false);
  closeOffcanvas$ = this.closeOffcanvasSubject.asObservable();

  closeOffcanvas() {
    this.closeOffcanvasSubject.next(true);
  }
  
  ngOnInit(): void {
    console.log(this.isUserLoggedIn)
    
    console.log(this.isAdminLoggedIn)
    if (this.isUserLoggedIn && !this.isAdminLoggedIn) {
      const username = localStorage.getItem('username');
      this.username = username ? username : null;
    } else if (this.isAdminLoggedIn) {
      const username = localStorage.getItem('username');
      this.username = username ? username : null;
    }
    // this.usernameSub = this.authService.usernameSubject.subscribe(username => {
    //   this.username = username;
    //   console.log(username)
    // });
    // const isuserLoggedIn = this.authService.getisLoggedIn();
    // if (isuserLoggedIn) {
    //   const username = localStorage.getItem('username');
    //   this.username = username ? username : null;
    // }
    
  }
  
  // Unsubscribe to usernameSubject to prevent memory leaks
  ngOnDestroy(): void {
    this.usernameSub.unsubscribe();
  }

  // Add this method to HeaderComponent class
  logout(): void {
    if (this.isUserLoggedIn && !this.isAdminLoggedIn) {
      this.authService.logout();
      this.isUserLoggedIn = false;
    } else if (this.isAdminLoggedIn) {
      this.adminService.logout();
      this.isAdminLoggedIn = false;
    }
    this.username = null;
  }
}
