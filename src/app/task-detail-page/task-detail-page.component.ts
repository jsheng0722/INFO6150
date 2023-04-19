import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobaltaskService } from '../globaltask.service';
import { MatDialog } from '@angular/material/dialog';
import { AcceptTaskComponent } from '../accept-task/accept-task.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.css']
})
export class TaskDetailPageComponent implements OnInit {
  task: any | undefined;
  isLoggedin!:boolean;

  constructor(
    private route: ActivatedRoute,
    private authService : AuthService,
    private globaltaskService: GlobaltaskService,
    private router : Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.isLoggedin = this.authService.getisLoggedIn();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.globaltaskService.getTaskById(id!).subscribe((task: any) => {
      this.task = task;
    });
  }

  openAcceptDialog(task: any) {
    if (this.isLoggedin){
      const dialogRef = this.dialog.open(AcceptTaskComponent, {
        data: { task },
        width: '400px',
        disableClose: true,
        autoFocus: false,
        panelClass: 'dialog-centered'
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
    else{
      const result = confirm('You are not logged in. Do you want to login?');
      if (result) {
        this.router.navigate(['/login']); // Navigate to login page
      }
    }
  }

  goBack(): void {
    window.history.back();
  }
}
