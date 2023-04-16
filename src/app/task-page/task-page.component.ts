import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})

export class TaskPageComponent implements OnInit{

  constructor(public authService:AuthService, private router: Router){}

  ngOnInit() {
    const isLoggedIn = this.authService.getisLoggedIn();
    if (!isLoggedIn) {
      this.authService.setReturnUrl('/task');
      this.router.navigateByUrl('/login');
    }
  }
}
