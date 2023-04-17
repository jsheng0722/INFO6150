import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobaltaskService } from '../globaltask.service';
import { MatDialog } from '@angular/material/dialog';
import { AcceptTaskComponent } from '../accept-task/accept-task.component';

@Component({
  selector: 'app-task-detail-page',
  templateUrl: './task-detail-page.component.html',
  styleUrls: ['./task-detail-page.component.css']
})
export class TaskDetailPageComponent implements OnInit {
  task: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private globaltaskService: GlobaltaskService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.globaltaskService.getTaskById(id!).subscribe((task: any) => {
      this.task = task;
    });
  }

  openAcceptDialog(task: any) {
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

  goBack(): void {
    window.history.back();
  }
}
