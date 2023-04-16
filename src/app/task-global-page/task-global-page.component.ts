import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-global-page',
  templateUrl: './task-global-page.component.html',
  styleUrls: ['./task-global-page.component.css']
})
export class TaskGlobalPageComponent {
  imagePath = 'assets/images';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.setReturnUrl('/globalTask');
  }

  navigateToTargetPage() {
    if (this.authService.getisLoggedIn()) {
      this.router.navigate(['/task']);
    } else {
      this.authService.setReturnUrl('/task');
      this.router.navigate(['/login']);
    }
  }
}
